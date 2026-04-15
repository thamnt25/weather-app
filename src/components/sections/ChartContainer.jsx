import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import cloudyIcon from "../../assets/images/icon-overcast.webp";
import partlyCloudyIcon from "../../assets/images/icon-partly-cloudy.webp";
import sunnyIcon from "../../assets/images/icon-sunny.webp";

const data = [
  { name: "12 AM", uv: 4000, icon: cloudyIcon },
  { name: "2 AM", uv: 3000, icon: partlyCloudyIcon },
  { name: "4 AM", uv: 2000, icon: partlyCloudyIcon },
  { name: "6 AM", uv: 2200, icon: partlyCloudyIcon },
  { name: "8 AM", uv: 3200, icon: cloudyIcon },
  { name: "10 AM", uv: 3600, icon: sunnyIcon },
  { name: "12 PM", uv: 3000, icon: sunnyIcon },
];

function getUvColor(uv) {
  if (uv < 2000) return "#394E6F";
  if (uv < 3000) return "#415E64";
  if (uv < 3500) return "#669784";
  return "#FF8A65";
}

const CustomXAxisTick = ({ x, y, payload }) => {
  const item = data.find((entry) => entry.name === payload.value);

  return (
    <g transform={`translate(${x},${y})`}>
      {item?.icon && (
        <image
          x={0}
          y={0}
          href={item.icon}
          width={32}
          height={32}
          preserveAspectRatio="xMidYMid meet"
        />
      )}
      <text
        x={50}
        y={24}
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

const ChartContainer = () => {
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
          data={data}
          margin={{
            top: 40,
            right: 30,
            left: 0,
            bottom: 60,
          }}
        >
          <defs>
            <linearGradient id="uvGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              {data.map((item, index) => (
                <stop
                  key={item.name}
                  offset={`${(index / (data.length - 1)) * 100}%`}
                  stopColor={getUvColor(item.uv)}
                  stopOpacity={1}
                />
              ))}
            </linearGradient>
          </defs>

          <XAxis
            dataKey="name"
            interval={0}
            tickLine={false}
            axisLine={false}
            height={40}
            tick={<CustomXAxisTick />}
          />
          <YAxis
            dataKey="uv"
            tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
            axisLine={{ stroke: "#cbd5e1" }}
          />
          <Tooltip />
          <CartesianGrid strokeDasharray="1 1" />
          <Area
            type="monotone"
            dataKey="uv"
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
