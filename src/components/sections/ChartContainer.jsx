import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { filterData } from "../../schemas/WeatherSchema";

function getChartColor(value, weatherState) {
  if (weatherState === 2) {
    if (value < 3) return "#5cc8ff";
    if (value < 6) return "#93d96b";
    if (value < 8) return "#ffd166";
    return "#ff8a65";
  }

  if (weatherState === 3) {
    if (value < 10) return "#6dcff6";
    if (value < 25) return "#56c596";
    return "#ff9f43";
  }

  if (weatherState === 4) {
    if (value < 40) return "#9dd6ff";
    if (value < 70) return "#7fd1c8";
    return "#4fb3bf";
  }

  if (weatherState === 5) {
    if (value < 2000) return "#607d8b";
    if (value < 6000) return "#7bc96f";
    return "#b8e986";
  }

  if (value < 0) return "#394e6f";
  if (value < 12) return "#669784";
  if (value < 24) return "#b8e986";
  return "#ffd166";
}

const MOBILE_BREAKPOINT = 640;

const CustomXAxisTick = ({ x, y, payload, chartData, isCompact }) => {
  const item = chartData.find((entry) => entry.time === payload.value);
  const iconSize = isCompact ? 22 : 28;
  const textOffset = isCompact ? 36 : 44;
  const textSize = isCompact ? 10 : 12;
  const iconOffset = -(iconSize / 2);

  return (
    <g transform={`translate(${x},${y})`}>
      {item?.icon && (
        <image
          x={iconOffset}
          y={0}
          href={item.icon.icon}
          width={iconSize}
          height={iconSize}
          preserveAspectRatio="xMidYMid meet"
        />
      )}
      <text
        x={0}
        y={textOffset}
        textAnchor="middle"
        fill="#64748b"
        fontSize={textSize}
        fontWeight={500}
      >
        {payload.value}
      </text>
    </g>
  );
};

const ChartContainer = ({ hourlyData, weatherState, selectedDay }) => {
  const [isCompact, setIsCompact] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false,
  );
  const chartData = filterData(hourlyData, weatherState, selectedDay);

  useEffect(() => {
    function handleResize() {
      setIsCompact(window.innerWidth < MOBILE_BREAKPOINT);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!selectedDay || !chartData.length) {
    return null;
  }

  const tickInterval = isCompact
    ? Math.max(Math.ceil(chartData.length / 6) - 1, 0)
    : Math.max(Math.ceil(chartData.length / 8) - 1, 0);

  return (
    <div className="mt-4 min-w-0 rounded-[1.5rem] border border-neutral-600/55 bg-neutral-800/95 p-3 shadow-[0_18px_40px_rgba(3,1,45,0.24)] sm:p-4">
      <div className="h-[280px] w-full sm:h-[320px] lg:h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{
            top: 20,
            right: isCompact ? 8 : 18,
            left: isCompact ? -24 : -12,
            bottom: isCompact ? 46 : 56,
          }}
        >
          <defs>
            <linearGradient id="uvGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              {chartData.map((item, index) => (
                <stop
                  key={`${item.time}-${index}`}
                  offset={`${(index / Math.max(chartData.length - 1, 1)) * 100}%`}
                  stopColor={getChartColor(item.value, weatherState)}
                  stopOpacity={1}
                />
              ))}
            </linearGradient>
          </defs>

          <XAxis
            dataKey="time"
            interval={tickInterval}
            tickLine={false}
            axisLine={false}
            minTickGap={isCompact ? 24 : 16}
            height={isCompact ? 44 : 52}
            tick={(props) => (
              <CustomXAxisTick
                {...props}
                chartData={chartData}
                isCompact={isCompact}
              />
            )}
          />
          <YAxis
            width={isCompact ? 34 : 44}
            tick={{ fill: "#64748b", fontSize: isCompact ? 10 : 12, fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip />
          <CartesianGrid strokeDasharray="1 1" />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#7BC96F"
            fill="url(#uvGradient)"
            fillOpacity={1}
          />
        </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartContainer;
