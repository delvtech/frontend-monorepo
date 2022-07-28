// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.15;

/// @notice A Time Weighted Average Rate Oracle to calculate the value over a given time period.
/// @dev Stores values in customizable circular buffers.  Values are stored as the cumulative sum
/// where cumSum = value * timeDelta + prevCumSum.  The time delta is the time that has elapsed
/// since the previous update.
contract TWAROracle {
    mapping(uint256 => uint256[]) internal _buffers;

    /// @dev An initialization function for the buffer.  During initialization, the maxLength is
    /// set to the value passed in, minTimeStep and timeStamp are set to values for the current block.
    /// 0 when the first item is added.
    /// @param bufferId The ID of the buffer to initialize.
    /// @param maxTime The maximum time in seconds the buffer will provide history for.  This cannot
    /// be unset.
    /// @param maxLength The maximum number of items in the buffer.  This cannot be unset.
    function _initializeBuffer(
        uint256 bufferId,
        uint16 maxTime,
        uint16 maxLength
    ) internal {
        // maxLength of zero indicates a buffer has not been initialized.  Upper value for
        // maxLength checked by the fact that it is uint16.
        require(maxLength > 1, "min length is 1");

        (, , , uint16 _maxLength, ) = readMetadataParsed(bufferId);
        require(_maxLength == 0, "buffer already initialized");

        // The minimum time required to pass before an update will be made to a buffer.
        uint32 minTimeStep = uint32(maxTime) / uint32(maxLength);
        // This is more of a sanity check.  Note that minimum time steps that are less time than a
        // block can lead to dangerous side effects.
        require(minTimeStep >= 1, "minimum time step is 1");

        uint256 metadata = _combineMetadata(
            minTimeStep,
            uint32(block.timestamp),
            0,
            maxLength,
            0
        );

        // Get a reference to the buffer we want to initialize and save the initial metadata.
        uint256[] storage buffer = _buffers[bufferId];
        assembly {
            // length is stored at position 0 for dynamic arrays
            // we are overloading this to store metadata to be more efficient
            sstore(buffer.slot, metadata)
        }
    }

    /// @dev Gets the parsed metadata for the buffer which includes headIndex, maxLength and
    /// bufferLength.
    /// @param bufferId The ID of the buffer to read metadata from.
    /// @return minTimeStep timeStamp headIndex maxLength bufferLength as a tuple of uint16's
    function readMetadataParsed(uint256 bufferId)
        public
        view
        returns (
            uint32 minTimeStep,
            uint32 timeStamp,
            uint16 headIndex,
            uint16 maxLength,
            uint16 bufferLength
        )
    {
        uint256[] storage buffer = _buffers[bufferId];
        uint256 metadata = buffer.length;

        bufferLength = uint16(metadata);
        // 16
        maxLength = uint16(metadata >> 16);
        // 16 + 16
        headIndex = uint16(metadata >> 32);
        // 16 + 16 + 16
        timeStamp = uint32(metadata >> 48);
        // 16 + 16 + 16 + 32
        minTimeStep = uint32(metadata >> 80);
    }

    /// @dev An internal function to update a buffer.  Takes a value, calculates the cumulative
    /// sum, then records it along with the timeStamp in the following manner:
    /// [uint32 timeStamp][uint224 cumulativeSum]
    /// @param bufferId The ID of the buffer to update.
    /// @param value The value to add to the buffer.
    function _updateBuffer(uint256 bufferId, uint224 value) internal {
        (
            uint32 minTimeStep,
            uint32 previousTimeStamp,
            uint16 headIndex,
            uint16 maxLength,
            uint16 bufferLength
        ) = readMetadataParsed(bufferId);

        uint32 timeStep = uint32(block.timestamp) - previousTimeStamp;
        // Fail silently if enough time has not passed.  We don't reject here because we want
        // calling contracts to try to update often without reverting. Also, if the buffer is
        // uninitialized, don't allow updates.
        if (timeStep < minTimeStep || maxLength == 0) {
            return;
        }

        // Grab the previous sum (if available).
        uint224 previousSum;
        uint256[] storage buffer = _buffers[bufferId];
        if (bufferLength != 0) {
            // Cast to uint224 to drop the upper 32 bits that hold the timestamp.
            previousSum = uint224(buffer[headIndex]);
        }

        // The time between now and the previous update.
        uint224 timeDelta = uint224(
            uint32(block.timestamp) - previousTimeStamp
        );

        // cumulative sum = value * time + previous sum
        uint224 cumulativeSum = value * timeDelta + previousSum;

        // Pack the timeStamp and cumulativeSum together.
        uint256 sumAndTimeStamp = (uint256(block.timestamp) << 224) |
            uint256(cumulativeSum);

        // Don't increment headIndex if this is the first value added.
        // Otherwise, increment the index and rollover to zero if we pass maxLength.
        if (bufferLength == 0) {
            headIndex = 0;
        } else {
            headIndex = (headIndex + 1) % maxLength;
        }

        // We continue to increase the buffer length until we hit the max length, at which point
        // the buffer length remains maxed out and the oldest item will be overwritten.
        if (bufferLength < maxLength) {
            bufferLength++;
        }

        uint256 metadata = _combineMetadata(
            minTimeStep,
            uint32(block.timestamp),
            headIndex,
            maxLength,
            bufferLength
        );

        // update the metadata
        assembly {
            // length is stored at position 0 for dynamic arrays.
            // We are overloading this to store metadata for gas savings.
            sstore(buffer.slot, metadata)
        }

        buffer[headIndex] = sumAndTimeStamp;
    }

    /// @dev A public function to read the timeStamp&sum value from the specified index and buffer.
    /// @param bufferId The ID of the buffer to initialize.
    /// @param index The index to read a value at.
    /// @return timeStamp cumulativeSum 32bit timeStamp and 224bit sum
    function readSumAndTimeStampForPool(uint256 bufferId, uint16 index)
        public
        view
        returns (uint32 timeStamp, uint224 cumulativeSum)
    {
        (, , , , uint16 bufferLength) = readMetadataParsed(bufferId);

        // Because we use the length prop for metadata, we need to specifically check the index.
        require(index < bufferLength, "index out of bounds");

        uint256 value = _buffers[bufferId][index];
        cumulativeSum = uint224(value);
        timeStamp = uint32(value >> 224);
    }

    /// @dev A public function to calculate the average weighted value over a timePeriod between
    /// now and timeInSeconds earlier.  This is accomplished via an iterative approach by working
    /// backwards in time until we find the update who's timeStamp is older than the requested
    /// time, subtracting that previous sum and any partial sum if the requested time falls between
    /// two timestamps in the buffer.
    /// @param bufferId The ID of the buffer to initialize.
    /// @param timeInSeconds Amount of time previous to now to average the value over.
    /// @return averageWeightedValue Value averaged over time range, weighted by time period for
    /// each value.  The time period for each value is the time from the previous update to the
    /// current block's time stamp.
    function calculateAverageWeightedValue(
        uint256 bufferId,
        uint32 timeInSeconds
    ) public view returns (uint256 averageWeightedValue) {
        (
            ,
            ,
            uint16 headIndex,
            uint16 maxLength,
            uint16 bufferLength
        ) = readMetadataParsed(bufferId);

        // We can't calculate the value from just one element since there is no previous timeStamp.
        require(bufferLength > 1, "not enough elements");

        // If the buffer is full, the oldest index is the next index, otherwise its the first
        // element in the array.
        uint16 oldestIndex = bufferLength == maxLength
            ? (headIndex + 1) % maxLength
            : 0;

        // Keep track of these for later calculations.
        uint32 endTime = uint32(block.timestamp);
        uint224 currentSum;

        // The point in time we work back to.
        uint256 requestedTimeStamp = block.timestamp - uint256(timeInSeconds);

        // Get initial values for currentTimeStamp, cumulativeSum and index for the while loop.
        (
            uint32 currentTimeStamp,
            uint224 cumulativeSum
        ) = readSumAndTimeStampForPool(bufferId, headIndex);
        uint16 index = headIndex;

        // Edge case:
        // If the requested time doesn't reach far enough back, then we just return the last value.
        // To get the value we basically undo the cumulative sum:
        // cumulativeSum = value * time + previousSum
        // value = (cumulativeSum - previousSum) / (currentTimeStamp - previousTimeStamp)
        if (requestedTimeStamp > currentTimeStamp) {
            uint16 previousIndex = index == 0 ? maxLength - 1 : index - 1;
            (
                uint32 previousTimeStamp,
                uint224 previousSum
            ) = readSumAndTimeStampForPool(bufferId, previousIndex);

            averageWeightedValue =
                (cumulativeSum - previousSum) /
                (currentTimeStamp - previousTimeStamp);
            return averageWeightedValue;
        }

        // Normal case:
        // Work our way backwards to requestedTimeStamp.  Because the buffer keeps track of
        // cumulative sum, we don't need to add anything up, just find the first element that is
        // older than the requestedTimeStamp.
        while (currentTimeStamp >= requestedTimeStamp && index != oldestIndex) {
            // Decrement index or rollback to end of buffer if we need to until we pass the
            // the requestedTimeStamp.
            index = index == 0 ? maxLength - 1 : index - 1;
            (currentTimeStamp, currentSum) = readSumAndTimeStampForPool(
                bufferId,
                index
            );
        }

        // Edge case:
        // If we've reached the oldest value in the buffer, then we just take the cumulativeSum
        // divided by the time to get the average weighted value.
        if (index == oldestIndex) {
            // Note The currentSum involves the value between currentTimeStamp and the
            // previousTimeStamp. Since there is no previousTimeStamp for the oldest sum
            // we have to drop the oldest sum.
            averageWeightedValue =
                (cumulativeSum - currentSum) / // currentSum is the oldest sum.
                (endTime - currentTimeStamp);

            // Normal case:
            // Otherwise, we need to subtract the sums outside time range, add a partial sum if
            // time requested is between two timeStamps, and divide by the total time to get
            // average weighted value.
        } else {
            uint16 nextIndex = (index + 1) % maxLength;
            (
                uint32 currentTimePlusOne,
                uint224 currentSumPlusOne
            ) = readSumAndTimeStampForPool(bufferId, nextIndex);

            // Get the sum between the two timeStamps around the requested time.
            uint256 sumDuringRequestedTime = uint256(currentSumPlusOne) -
                uint256(currentSum);

            // partialSum = sumDuringRequestedTime * partialTime
            // because the denominator of partialTime is always >= the numerator, we can't
            // calculate partialTime first otherwise it would always be zero.  So, we multiply by
            // the numerator first, the divide by the denominator:
            // uint256 partialTime = (currentTimePlusOne) - requestedTimeStamp) /
            //                       (currentTimePlusOne - currentTimeStamp);
            uint256 partialSum = sumDuringRequestedTime *
                (uint256(currentTimePlusOne) - uint256(requestedTimeStamp));
            partialSum =
                partialSum /
                (uint256(currentTimePlusOne) - uint256(currentTimeStamp));

            averageWeightedValue =
                (uint256(cumulativeSum) -
                    uint256(currentSumPlusOne) +
                    partialSum) /
                (uint256(endTime) - uint256(requestedTimeStamp));
        }
    }

    /// @dev An internal method to combine all metadata parts into a uint256 value.
    /// @param headIndex The index of the last item added to the buffer.
    /// @param maxLength The maximum length of the buffer.
    /// @param bufferLength The current length of the buffer.
    /// @return metadata Metadata encoded in a uint256 value.
    // [u144 unused][uint32 minTimeStep][uint32 timeStamp][u16 headIndex][u16 maxLength][u16 length]
    function _combineMetadata(
        uint32 minTimeStep,
        uint32 timeStamp,
        uint16 headIndex,
        uint16 maxLength,
        uint16 bufferLength
    ) internal pure returns (uint256 metadata) {
        metadata =
            // 16 + 16 + 16 + 32
            (uint256(minTimeStep) << 80) |
            // 16 + 16 + 16
            (uint256(timeStamp) << 48) |
            // 16 + 16
            (uint256(headIndex) << 32) |
            // 16
            (uint256(maxLength) << 16) |
            uint256(bufferLength);
    }
}
