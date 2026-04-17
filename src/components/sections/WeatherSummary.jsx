import { useEffect, useState } from "react";
import {
  formatPrecipitation,
  formatTemperature,
  formatWindSpeed,
} from "../../schemas/WeatherSchema";
import WeatherMap from "./WeatherMap";
import ChartContainer from "./ChartContainer";

import DailyCarousel from "./DailyCarousel";

const detailSkeletons = ["Feels Like", "Humidity", "Wind", "Precipitation"];

const detailDescriptions = {
  Humidity:
    "Amount of moisture present in the air relative to the maximum amount of moisture the air can contain at its current temperature.",
  Wind: "Current wind speed measured near ground level.",
  Precipitation:
    "The amount of rain or other precipitation expected or recorded during the period.",
  Visibility:
    "The distance you can clearly see through the air at your location.",
  "Dew point":
    "The temperature at which air becomes saturated and water vapor begins to condense.",
  Pressure:
    "Atmospheric pressure at your location, which can influence changes in the weather.",
};

const WeatherSummary = ({
  currentData,
  dailyData,
  address,
  unitSystem,
  isLoading,
  latitude,
  longitude,
  hourlyData,
  setIsLoading,
}) => {
  const [weatherState, setWeatherState] = useState(1);
  const [selectedDay, setSelectedDay] = useState(dailyData?.[0]?.date ?? null);

  useEffect(() => {
    if (dailyData?.length && !selectedDay) {
      setSelectedDay(dailyData[0].date);
    }
  }, [dailyData, selectedDay]);

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
          <span className="text-xl font-semibold text-white">
            Daily Forecast
          </span>
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
      id: 2,
      title: "Humidity",
      value: `${currentData.humidity}%`,
      description: detailDescriptions.Humidity,
    },
    {
      id: 3,
      title: "Wind",
      value: formatWindSpeed(currentData.windSpeed, unitSystem),
      description: detailDescriptions.Wind,
    },
    {
      id: 4,
      title: "Precipitation",
      value: formatPrecipitation(currentData.precipitation, unitSystem),
      description: detailDescriptions.Precipitation,
    },
    {
      id: 5,
      title: "Visibility",
      value: formatPrecipitation(currentData.visibility, unitSystem),
      description: detailDescriptions.Visibility,
    },
    {
      id: 6,
      title: "Dew point",
      value: formatPrecipitation(currentData.dewPoint, unitSystem),
      description: detailDescriptions["Dew point"],
    },
    {
      id: 7,
      title: "Pressure",
      value: formatPrecipitation(currentData.pressure, unitSystem),
      description: detailDescriptions.Pressure,
    },
  ];

  return (
    <div className="flex w-full flex-col p-3">
      <div className="mt-5">
        <div className="hero-summary flex flex-col rounded-md p-3 lg:col-span-2">
          <div className="flex flex-col items-center text-white lg:items-start">
            <span className="text-xl font-semibold">{address}</span>
            <span className="text-base font-normal">Tuesday Apr 13</span>
          </div>

          <div className="mt-6 flex items-center lg:mt-0 gap-3">
            <div className="flex flex-row items-center">
              <img
                src={currentData.icon.icon}
                alt="Current weather"
                className="h-20 w-20 md:h-28 md:w-28"
              />
              <span className="text-3xl font-semibold text-white lg:text-6xl">
                {formatTemperature(currentData.temperature, unitSystem)}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-lg font-semibold text-white">
                Most Cloudy
              </span>
              <span className="text-sm text-white">Feel like 13</span>
            </div>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-6 items-center gap-3 mt-5">
            {weatherDetails.map((detail) => (
              <div key={detail.id} className="flex flex-col items-center">
                <div className="flex flex-row items-center gap-2">
                  <span className="text-base font-semibold text-neutral-200 text-xs mr-2">
                    {detail.title}
                  </span>
                  <div className="group relative">
                    <button
                      type="button"
                      aria-label={`More information about ${detail.title}`}
                      className="flex h-4 w-4 items-center justify-center rounded-full text-white/55 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                        className="pointer-events-none"
                        aria-hidden="true"
                      >
                        <path
                          d="M6.00001 0.166061C9.22217 0.166061 11.8342 2.77814 11.8342 6.0003C11.8342 9.22246 9.22217 11.8345 6.00001 11.8345C2.77785 11.8345 0.165771 9.22246 0.165771 6.0003C0.165771 2.77814 2.77785 0.166061 6.00001 0.166061ZM6.00001 1.04106C3.2611 1.04106 1.04077 3.26139 1.04077 6.0003C1.04077 8.73921 3.2611 10.9595 6.00001 10.9595C8.73892 10.9595 10.9592 8.73921 10.9592 6.0003C10.9592 3.26139 8.73892 1.04106 6.00001 1.04106ZM5.99788 5.12473C6.21937 5.12459 6.40253 5.28906 6.43164 5.50258L6.43567 5.56195L6.43777 8.77121C6.43793 9.01284 6.24218 9.20884 6.00056 9.209C5.77907 9.20914 5.59591 9.04467 5.5668 8.83115L5.56277 8.77178L5.56067 5.56252C5.56051 5.3209 5.75626 5.12489 5.99788 5.12473ZM6.00027 3.08437C6.32201 3.08437 6.58282 3.34519 6.58282 3.66693C6.58282 3.98866 6.32201 4.24948 6.00027 4.24948C5.67854 4.24948 5.41772 3.98866 5.41772 3.66693C5.41772 3.34519 5.67854 3.08437 6.00027 3.08437Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </button>
                    <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-3 hidden w-64 -translate-x-1/2 rounded-xl border border-neutral-600 bg-neutral-0 p-4 text-left text-sm leading-6 text-neutral-800 shadow-[0_18px_40px_rgba(3,1,45,0.2)] group-hover:block group-focus-within:block">
                      <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-neutral-600 bg-neutral-0" />
                      <p className="relative">{detail.description}</p>
                    </div>
                  </div>
                </div>
                <span className="text-base text-white">{detail.value}</span>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="lg:col-span-1">
          <WeatherMap
            address={address}
            latitude={latitude}
            longitude={longitude}
            currentData={currentData}
            unitSystem={unitSystem}
            isLoading={isLoading}
          />
        </div> */}
      </div>

      <DailyCarousel
        dailyData={dailyData}
        unitSystem={unitSystem}
        isLoading={isLoading}
        weatherState={weatherState}
        setWeatherState={setWeatherState}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <ChartContainer
        hourlyData={hourlyData}
        weatherState={weatherState}
        selectedDay={selectedDay}
      />
    </div>
  );
};

export default WeatherSummary;
