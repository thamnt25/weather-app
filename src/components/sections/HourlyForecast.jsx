import { useState } from "react";
import iconCloudy from "../../assets/images/icon-overcast.webp";
import iconDropdown from "../../assets/images/icon-dropdown.svg";
import iconFog from "../../assets/images/icon-fog.webp";
import iconPartlyCloudy from "../../assets/images/icon-partly-cloudy.webp";
import iconRain from "../../assets/images/icon-rain.webp";
import iconSunny from "../../assets/images/icon-sunny.webp";

const hourlyForecastByDay = {
  Tuesday: [
    { time: "3 PM", temperature: "20°", icon: iconCloudy, condition: "Cloudy" },
    {
      time: "4 PM",
      temperature: "20°",
      icon: iconPartlyCloudy,
      condition: "Partly cloudy",
    },
    { time: "5 PM", temperature: "20°", icon: iconSunny, condition: "Sunny" },
    { time: "6 PM", temperature: "19°", icon: iconCloudy, condition: "Cloudy" },
    { time: "7 PM", temperature: "18°", icon: iconRain, condition: "Rain" },
    { time: "8 PM", temperature: "18°", icon: iconFog, condition: "Fog" },
    { time: "9 PM", temperature: "17°", icon: iconRain, condition: "Rain" },
    { time: "10 PM", temperature: "17°", icon: iconCloudy, condition: "Cloudy" },
  ],
  Wednesday: [
    { time: "3 PM", temperature: "19°", icon: iconRain, condition: "Rain" },
    { time: "4 PM", temperature: "19°", icon: iconRain, condition: "Rain" },
    { time: "5 PM", temperature: "18°", icon: iconCloudy, condition: "Cloudy" },
    {
      time: "6 PM",
      temperature: "18°",
      icon: iconPartlyCloudy,
      condition: "Partly cloudy",
    },
    { time: "7 PM", temperature: "17°", icon: iconCloudy, condition: "Cloudy" },
    { time: "8 PM", temperature: "17°", icon: iconFog, condition: "Fog" },
    { time: "9 PM", temperature: "16°", icon: iconRain, condition: "Rain" },
    { time: "10 PM", temperature: "16°", icon: iconCloudy, condition: "Cloudy" },
  ],
  Thursday: [
    { time: "3 PM", temperature: "24°", icon: iconSunny, condition: "Sunny" },
    {
      time: "4 PM",
      temperature: "24°",
      icon: iconPartlyCloudy,
      condition: "Partly cloudy",
    },
    { time: "5 PM", temperature: "23°", icon: iconSunny, condition: "Sunny" },
    { time: "6 PM", temperature: "22°", icon: iconSunny, condition: "Sunny" },
    { time: "7 PM", temperature: "21°", icon: iconCloudy, condition: "Cloudy" },
    { time: "8 PM", temperature: "20°", icon: iconCloudy, condition: "Cloudy" },
    { time: "9 PM", temperature: "19°", icon: iconFog, condition: "Fog" },
    { time: "10 PM", temperature: "18°", icon: iconCloudy, condition: "Cloudy" },
  ],
};

const availableDays = Object.keys(hourlyForecastByDay);

const HourlyForecast = () => {
  const [selectedDay, setSelectedDay] = useState("Tuesday");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedForecast = hourlyForecastByDay[selectedDay];

  return (
    <aside className="mt-8 w-full md:mt-5 md:ml-6 md:flex md:max-w-[19rem] xl:max-w-[20.5rem]">
      <div className="h-full w-full rounded-[1.75rem] border border-neutral-600/70 bg-neutral-800 p-4 shadow-[0_22px_55px_rgba(3,1,45,0.4)] md:p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <h2 className="pt-2 text-lg font-semibold tracking-[0.01em] text-neutral-0">
            Hourly forecast
          </h2>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen((current) => !current)}
              className="flex items-center gap-2 rounded-xl bg-neutral-700 px-3 py-2 text-sm font-medium text-neutral-0 transition-colors hover:bg-neutral-600"
            >
              <span>{selectedDay}</span>
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
                      selectedDay === day
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
              key={`${selectedDay}-${forecast.time}`}
              className="flex items-center justify-between rounded-2xl border border-neutral-600/55 bg-neutral-700/90 px-4 py-3.5 text-neutral-0 transition-colors hover:bg-neutral-600/95"
            >
              <div className="flex items-center gap-3">
                <img
                  src={forecast.icon}
                  alt={forecast.condition}
                  className="h-8 w-8 object-contain"
                />
                <span className="text-base font-medium tracking-[0.01em]">
                  {forecast.time}
                </span>
              </div>

              <span className="text-sm font-medium text-neutral-200">
                {forecast.temperature}
              </span>
            </article>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default HourlyForecast;
