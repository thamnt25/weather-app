import { useEffect, useState } from "react";
import iconDropdown from "../../assets/images/icon-dropdown.svg";
import {
  formatTemperature,
  getWeatherCondition,
  getWeatherIcon,
} from "../../schemas/WeatherSchema";

const HourlyForecast = ({ hourData, unitSystem, isLoading }) => {
  const availableDays = hourData ? Object.keys(hourData) : [];
  const [selectedDay, setSelectedDay] = useState(availableDays[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (availableDays.length > 0 && !availableDays.includes(selectedDay)) {
      setSelectedDay(availableDays[0]);
    }
  }, [availableDays, selectedDay]);

  if (isLoading || !hourData || availableDays.length === 0) {
    return (
      <aside className="mt-8 w-full lg:mt-5 lg:ml-6 lg:flex lg:max-w-[19rem] xl:max-w-[20.5rem]">
        <div className="h-full w-full rounded-[1.75rem] border border-neutral-600/70 bg-neutral-800 p-4 shadow-[0_22px_55px_rgba(3,1,45,0.4)] md:p-5">
          <div className="mb-4 flex items-start justify-between gap-3">
            <h2 className="text-lg font-semibold tracking-[0.01em] text-neutral-0 sm:pt-2">
              Hourly forecast
            </h2>

            <div className="flex items-center gap-2 rounded-xl bg-neutral-700 px-3 py-2 text-sm font-medium text-neutral-0">
              <span>--</span>
              <img src={iconDropdown} alt="" className="w-3 rotate-180" />
            </div>
          </div>

          <div className="space-y-3">
            {Array.from({ length: 8 }, (_, index) => (
              <div
                key={index}
                className="h-[4.7rem] rounded-2xl border border-neutral-600/55 bg-neutral-700/90 px-4 py-3.5"
              >
                <div className="loading-shimmer h-full w-full rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  const activeDay = availableDays.includes(selectedDay)
    ? selectedDay
    : availableDays[0];
  const selectedForecast = hourData[activeDay];

  return (
    <aside className="mt-8 w-full lg:mt-5 lg:ml-6 lg:flex lg:max-w-[19rem] xl:max-w-[20.5rem]">
      <div className="h-full w-full rounded-[1.75rem] border border-neutral-600/70 bg-neutral-800 p-4 shadow-[0_22px_55px_rgba(3,1,45,0.4)] md:p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="text-lg font-semibold tracking-[0.01em] text-neutral-0 sm:pt-2">
            Hourly forecast
          </h2>

          <div className="relative self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setIsDropdownOpen((current) => !current)}
              className="flex items-center gap-2 rounded-xl bg-neutral-700 px-3 py-2 text-sm font-medium text-neutral-0 transition-colors hover:bg-neutral-600"
            >
              <span>{activeDay}</span>
              <img
                src={iconDropdown}
                alt=""
                className={`w-3 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen ? (
              <div className="absolute right-0 top-[calc(100%+0.75rem)] z-20 w-40 rounded-2xl border border-neutral-600/70 bg-neutral-800 p-2 shadow-[0_20px_45px_rgba(3,1,45,0.55)]">
                {availableDays.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => {
                      setSelectedDay(day);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                      activeDay === day
                        ? "bg-neutral-700 text-neutral-0"
                        : "text-neutral-200 hover:bg-neutral-700/80 hover:text-neutral-0"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="space-y-3">
          {selectedForecast.map((forecast) => (
            <article
              key={`${activeDay}-${forecast.time}`}
              className="flex items-center justify-between rounded-2xl border border-neutral-600/55 bg-neutral-700/90 px-4 py-3.5 text-neutral-0 transition-colors hover:bg-neutral-600/95"
            >
              <div className="flex items-center gap-3">
                <img
                  src={getWeatherIcon(forecast.weatherCode, forecast.isDay).icon}
                  alt={getWeatherCondition(
                    forecast.weatherCode,
                    forecast.isDay,
                  )}
                  className="h-8 w-8 object-contain"
                />
                <span className="text-base font-medium tracking-[0.01em]">
                  {forecast.time}
                </span>
              </div>

              <span className="text-sm font-medium text-neutral-200">
                {formatTemperature(forecast.temperature, unitSystem)}
              </span>
            </article>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default HourlyForecast;
