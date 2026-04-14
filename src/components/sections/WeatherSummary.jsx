import {
  formatPrecipitation,
  formatTemperature,
  formatWindSpeed,
} from "../../schemas/WeatherSchema";

const detailSkeletons = ["Feels Like", "Humidity", "Wind", "Precipitation"];

const WeatherSummary = ({
  currentData,
  dailyData,
  address,
  unitSystem,
  isLoading,
}) => {
  if (isLoading || !currentData || !dailyData) {
    return (
      <div className="flex w-full flex-col">
        <div>
          <div className="mt-5 flex min-h-[18rem] flex-col items-center justify-center rounded-[1.75rem] border border-neutral-600/55 bg-neutral-800/95 px-6 py-8 text-center shadow-[0_22px_55px_rgba(3,1,45,0.28)]">
            <div className="loading-dots mb-5">
              <span />
              <span />
              <span />
            </div>
            <span className="text-xl font-medium text-neutral-200">
              Loading...
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {detailSkeletons.map((title) => (
              <div
                key={title}
                className="rounded-lg border border-neutral-600/55 bg-neutral-800 px-4 py-3 md:px-5 md:py-4 xl:px-8"
              >
                <span className="text-base font-semibold text-neutral-200">
                  {title}
                </span>
                <div className="loading-shimmer mt-6 h-6 w-8 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <span className="text-xl font-semibold text-white">Daily Forecast</span>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
            {Array.from({ length: 7 }, (_, index) => (
              <div
                key={index}
                className="h-40 rounded-md border border-neutral-600/55 bg-neutral-800 px-3 py-3"
              >
                <div className="loading-shimmer h-full w-full rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const weatherDetails = [
    {
      id: 1,
      title: "Feels Like",
      value: formatTemperature(currentData.apparentTemperature, unitSystem),
    },
    { id: 2, title: "Humidity", value: `${currentData.humidity}%` },
    {
      id: 3,
      title: "Wind",
      value: formatWindSpeed(currentData.windSpeed, unitSystem),
    },
    {
      id: 4,
      title: "Precipitation",
      value: formatPrecipitation(currentData.precipitation, unitSystem),
    },
  ];

  return (
    <div className="flex w-full flex-col">
      <div>
        <div className="hero-summary mt-5 flex flex-col items-center rounded-md px-6 py-8 text-center md:px-8 md:py-12 lg:flex-row lg:justify-between lg:px-10 lg:text-left xl:py-20">
          <div className="flex flex-col items-center text-white lg:items-start">
            <span className="text-xl font-semibold">{address}</span>
            <span className="text-sm font-normal">Tuesday Apr 13</span>
          </div>

          <div className="mt-6 flex items-center lg:mt-0">
            <img
              src={currentData.icon.icon}
              alt="Current weather"
              className="h-24 w-24 md:h-28 md:w-28"
            />
            <span className="text-4xl font-bold italic text-white md:text-5xl">
              {formatTemperature(currentData.temperature, unitSystem)}
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {weatherDetails.map((detail) => (
            <div
              key={detail.id}
              className="flex flex-col justify-start gap-5 rounded-lg border border-neutral-600/55 bg-neutral-800 px-4 py-3 md:px-5 md:py-4 xl:px-8"
            >
              <span className="text-base font-semibold text-neutral-200">
                {detail.title}
              </span>
              <span className="text-lg text-white">{detail.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <span className="text-xl font-semibold text-white">Daily Forecast</span>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
          {dailyData.map((day) => (
            <div
              key={day.id}
              className="flex flex-col items-center gap-4 rounded-md bg-neutral-800 px-3 py-3 text-white"
            >
              <span className="text-base">{day.date}</span>
              <img
                src={day.icon.icon}
                alt={`${day.date} weather`}
                className="h-10 w-10"
              />
              <div className="flex w-full justify-between gap-2">
                <span className="text-base">
                  {formatTemperature(day.maxTemperature, unitSystem)}
                </span>
                <span className="text-base text-neutral-200">
                  {formatTemperature(day.minTemperature, unitSystem)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherSummary;
