import { COLORS } from "helpers/colorPalette";
import { devices } from "helpers/devices";
import React from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { DayCount } from "src/types";
import styled from "styled-components";

interface MintHistoryChartProps {
  mintHistory?: DayCount[];
}

export const MintHistoryChart: React.FC<MintHistoryChartProps> = ({
  mintHistory,
}) => {
  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={mintHistory ?? []}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={COLORS.whiteLight}
                stopOpacity={0.5}
              />
              <stop
                offset="50%"
                stopColor={COLORS.whiteLight}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fontFamily: "Rubik",
              fontSize: 10,
              fill: COLORS.lightGray,
            }}
            interval={"preserveStartEnd"}
            dataKey="date"
          />
          <YAxis hide />
          <Area
            activeDot={false}
            type="basis"
            dataKey="count"
            stroke={COLORS.white}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  height: 220px;
  width: 340px;
  margin: 10px 30px;
  padding: 5px;

  @media ${devices.mobileL} {
    height: 140px;
    width: 220px;
  }

  @media ${devices.mobileM} {
    height: 140px;
    width: 200px;
  }

  @media ${devices.mobileS} {
    height: 140px;
    width: 200px;
  }
`;
