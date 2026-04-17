import { useEffect, useState } from "react";
import { formatTemperature } from "../../schemas/WeatherSchema";

function getCardsPerView(width) {
  if (width >= 1280) return 6;
  if (width >= 1024) return 5;
  if (width >= 640) return 3;
  return 2;
}

const controlButtons = [
  { id: 1, control: "Overview" },
  { id: 2, control: "Precipitation" },
  { id: 3, control: "Wind" },
  { id: 4, control: "Humidity" },
  { id: 5, control: "Visibility" },
];

const DailyCarousel = ({
  dailyData = [],
  unitSystem,
  weatherState,
  setWeatherState,
  selectedDay,
  setSelectedDay,
}) => {
  const [cardsPerView, setCardsPerView] = useState(() =>
    typeof window === "undefined" ? 2 : getCardsPerView(window.innerWidth),
  );
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    function handleResize() {
      setCardsPerView(getCardsPerView(window.innerWidth));
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const maxStartIndex = Math.max(dailyData.length - cardsPerView, 0);

    if (startIndex > maxStartIndex) {
      setStartIndex(maxStartIndex);
    }
  }, [cardsPerView, dailyData.length, startIndex]);

  if (!dailyData.length) {
    return null;
  }

  const maxStartIndex = Math.max(dailyData.length - cardsPerView, 0);
  const visibleDays = dailyData.slice(startIndex, startIndex + cardsPerView);

  function showPrevious() {
    setStartIndex((current) => Math.max(current - 1, 0));
  }

  function showNext() {
    setStartIndex((current) => Math.min(current + 1, maxStartIndex));
  }

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between lg:flex-1">
          <span className="text-xl font-semibold text-white sm:shrink-0">
            Daily Forecast
          </span>
          <div className="flex min-w-0 gap-3 overflow-x-auto pb-1 sm:flex-1 sm:justify-end">
            {controlButtons.map((action) => (
              <button
                key={action.id}
                type="button"
                className={`shrink-0 rounded-2xl border border-neutral-600/80 ${weatherState === action.id ? "bg-transparent" : "bg-neutral-800"} px-3 py-2 text-sm font-semibold text-white hover:bg-neutral-700`}
                onClick={() => setWeatherState(action.id)}
              >
                {action.control}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            aria-label="Show previous daily forecast"
            onClick={showPrevious}
            disabled={startIndex === 0}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-600/55 bg-neutral-800 text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Show next daily forecast"
            onClick={showNext}
            disabled={startIndex === maxStartIndex}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-600/55 bg-neutral-800 text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:gap-5">
        {visibleDays.map((day) => (
          <button
            key={day.id}
            className={`flex min-w-0 flex-1 flex-col items-center gap-4 rounded-2xl border border-neutral-600/80 px-3 py-4 text-white sm:px-4 ${selectedDay === day.date ? "bg-transparent" : "bg-neutral-800"}`}
            onClick={() => setSelectedDay(day.date)}
          >
            <span className="text-base font-medium">{day.date}</span>
            <img
              src={day.icon.icon}
              alt={`${day.date} weather`}
              className="h-10 w-10"
            />
            <div className="flex w-full items-center justify-between gap-2">
              <span className="text-base">
                {formatTemperature(day.maxTemperature, unitSystem)}
              </span>
              <span className="text-base text-neutral-200">
                {formatTemperature(day.minTemperature, unitSystem)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DailyCarousel;
