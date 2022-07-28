// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.15;

library DateString {
    uint256 public constant SECONDS_PER_DAY = 24 * 60 * 60;
    uint256 public constant SECONDS_PER_HOUR = 60 * 60;
    uint256 public constant SECONDS_PER_MINUTE = 60;
    int256 public constant OFFSET19700101 = 2440588;

    // This function was forked from https://github.com/bokkypoobah/BokkyPooBahsDateTimeLibrary
    // ------------------------------------------------------------------------
    // Calculate year/month/day from the number of days since 1970/01/01 using
    // the date conversion algorithm from
    //   http://aa.usno.navy.mil/faq/docs/JD_Formula.php
    // and adding the offset 2440588 so that 1970/01/01 is day 0
    //
    // int L = days + 68569 + offset
    // int N = 4 * L / 146097
    // L = L - (146097 * N + 3) / 4
    // year = 4000 * (L + 1) / 1461001
    // L = L - 1461 * year / 4 + 31
    // month = 80 * L / 2447
    // dd = L - 2447 * month / 80
    // L = month / 11
    // month = month + 2 - 12 * L
    // year = 100 * (N - 49) + year + L
    // ------------------------------------------------------------------------
    // solhint-disable-next-line private-vars-leading-underscore
    function _daysToDate(uint256 _days)
        internal
        pure
        returns (
            uint256 year,
            uint256 month,
            uint256 day
        )
    {
        int256 __days = int256(_days);
        // solhint-disable-next-line var-name-mixedcase
        int256 L = __days + 68569 + OFFSET19700101;
        // solhint-disable-next-line var-name-mixedcase
        int256 N = (4 * L) / 146097;
        L = L - (146097 * N + 3) / 4;
        int256 _year = (4000 * (L + 1)) / 1461001;
        L = L - (1461 * _year) / 4 + 31;
        int256 _month = (80 * L) / 2447;
        int256 _day = L - (2447 * _month) / 80;
        L = _month / 11;
        _month = _month + 2 - 12 * L;
        _year = 100 * (N - 49) + _year + L;

        year = uint256(_year);
        month = uint256(_month);
        day = uint256(_day);
    }

    /// @dev Writes a prefix and an timestamp encoding to an output storage location
    ///      This function is designed to only work with ASCII encoded strings. No emojis please.
    /// @param _prefix The string to write before the timestamp
    /// @param _timestamp the timestamp to encode and store
    /// NOTE - Current cost ~90k if gas is problem revisit and use assembly to remove the extra
    ///        sstore s.
    function encodeAndWriteTimestamp(string memory _prefix, uint256 _timestamp)
        external
        pure
        returns (string memory)
    {
        return _encodeAndWriteTimestamp(_prefix, _timestamp);
    }

    /// @dev Sn internal version of the above function 'encodeAndWriteTimestamp'
    // solhint-disable-next-line
    function _encodeAndWriteTimestamp(string memory _prefix, uint256 _timestamp)
        internal
        pure
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    _prefix,
                    "-",
                    timestampToDateString(_timestamp)
                )
            );
    }

    /// @dev Converts a unix second encoded timestamp to a date format (year, month, day)
    ///      and return the output bytes.
    /// @param _timestamp the unix seconds timestamp
    function timestampToDateString(uint256 _timestamp)
        public
        pure
        returns (string memory)
    {
        return _timestampToDateString(_timestamp);
    }

    /// @dev Sn internal version of the above function 'timestampToDateString'
    // solhint-disable-next-line
    function _timestampToDateString(uint256 _timestamp)
        internal
        pure
        returns (string memory)
    {
        // First we get the day month and year
        (uint256 year, uint256 month, uint256 day) = _daysToDate(
            _timestamp / SECONDS_PER_DAY
        );

        // Extract the first digit of the day,i.e tenth's place.
        bytes1 firstDigitDate = bytes1(uint8(bytes1("0")) + uint8(day / 10));
        // Extract the second digit of the day,i.e first's place.
        bytes1 secondDigitDate = bytes1(uint8(bytes1("0")) + uint8(day % 10));
        // Calculate the year no. in current century.
        uint256 last2digitsOfYear = year % 100;
        // Extract the first digit of the year,i.e tenth's place.
        bytes1 firstDigitYear = bytes1(
            uint8(bytes1("0")) + uint8(last2digitsOfYear / 10)
        );
        // Extract the second digit of the year,i.e first's place.
        bytes1 secondDigitYear = bytes1(
            uint8(bytes1("0")) + uint8(last2digitsOfYear % 10)
        );
        // Get the month name in the ASCII format.
        bytes3 monthName = getMonthName(month);
        return
            string(
                bytes.concat(
                    firstDigitDate,
                    secondDigitDate,
                    monthName,
                    firstDigitYear,
                    secondDigitYear
                )
            );
    }

    function getMonthName(uint256 month)
        internal
        pure
        returns (bytes3 _monthName)
    {
        // Next we encode the month string and add it
        if (month == 1) {
            return 0x4A414E; // ASCII value of JAN
        } else if (month == 2) {
            return 0x464542; // ASCII value of FEB
        } else if (month == 3) {
            return 0x4D4152; // ASCII value of MAR
        } else if (month == 4) {
            return 0x415052; // ASCII value of APR
        } else if (month == 5) {
            return 0x4D4159; // ASCII value of MAY
        } else if (month == 6) {
            return 0x4A554E; // ASCII value of JUN
        } else if (month == 7) {
            return 0x4A554C; // ASCII value of JUL
        } else if (month == 8) {
            return 0x415547; // ASCII value of AUG
        } else if (month == 9) {
            return 0x534550; // ASCII value of SEP
        } else if (month == 10) {
            return 0x4F4354; // ASCII value of OCT
        } else if (month == 11) {
            return 0x4E4F56; // ASCII value of NOV
        } else if (month == 12) {
            return 0x444543; // ASCII value of DEC
        } else {
            revert("date decoding error");
        }
    }
}
