import { useMemo } from "react";
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

const CustomXAxisTick = ({ x, y, payload, chartData }) => {
  const item = chartData.find((entry) => entry.time === payload.value);

  return (
    <g transform={`translate(${x},${y})`}>
      {item?.icon && (
        <image
          x={0}
          y={0}
          href={item.icon.icon}
          width={28}
          height={28}
          preserveAspectRatio="xMidYMid meet"
        />
      )}
      <text
        x={14}
        y={44}
        textAnchor="middle"
        fill="#64748b"
        fontSize={12}
        fontWeight={500}
      >
        {payload.value}
      </text>
    </g>
  );
};

const ChartContainer = ({ hourlyData, weatherState, selectedDay }) => {
  const chartData = filterData(hourlyData, weatherState, selectedDay);
  console.log(chartData);
  if (!selectedDay || !chartData.length) {
    return null;
  }

  return (
    <div style={{ width: "100%", height: "360px" }} className="mt-4 relative">
      <button
        type="button"
        aria-label="Show previous hours"
        // onClick={showPrevious}
        // disabled={startIndex === 0}
        className="absolute left-12 top-1/2 z-20 flex h-10 w-6 -translate-y-1/2 items-center justify-center rounded-xl border border-neutral-600/55 bg-neutral-800 text-slate-800 shadow-[0_8px_20px_rgba(15,23,42,0.12)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="white"
          stroke="currentColor"
        >
          <path
            d="M15 19l-7-7 7-7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Show next hours"
        // onClick={showNext}
        // disabled={startIndex === maxStartIndex}
        className="absolute right-3 top-1/2 z-20 flex h-10 w-6 -translate-y-1/2 items-center justify-center rounded-xl rounded-xl border border-neutral-600/55 bg-neutral-800 text-slate-800 shadow-[0_8px_20px_rgba(15,23,42,0.12)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="white"
          stroke="currentColor"
        >
          <path
            d="M9 5l7 7-7 7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{
            top: 40,
            right: 30,
            left: 0,
            bottom: 60,
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
            interval={0}
            tickLine={false}
            axisLine={false}
            height={52}
            tick={(props) => (
              <CustomXAxisTick {...props} chartData={chartData} />
            )}
          />
          <YAxis
            tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
            axisLine={{ stroke: "#cbd5e1" }}
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
  );
};

export default ChartContainer;
