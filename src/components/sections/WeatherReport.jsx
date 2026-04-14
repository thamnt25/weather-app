import WeatherSummary from "./WeatherSummary";
import HourlyForecast from "./HourlyForecast";

const WeatherReport = ({ weatherData, unitSystem, isLoading }) => {
  return (
    <>
      <section>
        <div className="flex flex-col px-6 pt-5 pb-8 md:px-10 lg:flex-row lg:items-stretch lg:px-16 xl:px-30">
          <WeatherSummary
            address={weatherData?.address}
            currentData={weatherData?.current}
            dailyData={weatherData?.daily}
            unitSystem={unitSystem}
            isLoading={isLoading}
          />
          <HourlyForecast
            hourData={weatherData?.hourly}
            unitSystem={unitSystem}
            isLoading={isLoading}
          />
        </div>
      </section>
    </>
  );
};

export default WeatherReport;
