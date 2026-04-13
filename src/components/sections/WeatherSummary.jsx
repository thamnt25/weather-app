import { getWeatherIcon } from "../../schemas/WeatherSchema";

const weatherDetails = [
  { id: 1, title: "Feels Like", value: "18°" },
  { id: 2, title: "Humidity", value: "46%" },
  { id: 3, title: "Wind", value: "14 km/h" },
  { id: 4, title: "Precipitation", value: "0 mm" },
];

const dailyForecast = [
  { id: 1, date: "Tue", weatherCode: 63, isDay: 1, maxTemperature: 20, minTemperature: 14 },
  { id: 2, date: "Wed", weatherCode: 61, isDay: 1, maxTemperature: 21, minTemperature: 15 },
  { id: 3, date: "Thu", weatherCode: 0, isDay: 1, maxTemperature: 24, minTemperature: 14 },
  { id: 4, date: "Fri", weatherCode: 53, isDay: 1, maxTemperature: 25, minTemperature: 13 },
  { id: 5, date: "Sat", weatherCode: 95, isDay: 1, maxTemperature: 21, minTemperature: 15 },
  { id: 6, date: "Sun", weatherCode: 45, isDay: 1, maxTemperature: 25, minTemperature: 16 },
  { id: 7, date: "Mon", weatherCode: 80, isDay: 1, maxTemperature: 24, minTemperature: 15 },
];

const WeatherSummary = () => {
  return (
    <div className="flex w-full flex-col">
      <div>
        <div className="hero-summary mt-5 flex flex-col items-center rounded-md px-6 py-8 text-center md:px-8 md:py-12 lg:flex-row lg:justify-between lg:px-10 lg:text-left xl:py-20">
          <div className="flex flex-col items-center text-white lg:items-start">
            <span className="text-xl font-semibold">Berlin, Germany</span>
            <span className="text-sm font-normal">Tuesday Apr 13</span>
          </div>

          <div className="mt-6 flex items-center lg:mt-0">
            <img
              src={getWeatherIcon(0, 1).icon}
              alt="Sunny weather"
              className="h-24 w-24 md:h-28 md:w-28"
            />
            <span className="text-4xl font-bold italic text-white md:text-5xl">20°C</span>
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
          {dailyForecast.map((day) => (
            <div
              key={day.id}
              className="flex flex-col items-center gap-4 rounded-md bg-neutral-800 px-3 py-3 text-white"
            >
              <span className="text-base">{day.date}</span>
              <img
                src={getWeatherIcon(day.weatherCode, day.isDay).icon}
                alt={`${day.date} weather`}
                className="h-10 w-10"
              />
              <div className="flex w-full justify-between">
                <span className="text-base">{day.maxTemperature}°</span>
                <span className="text-base text-neutral-200">{day.minTemperature}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherSummary;
