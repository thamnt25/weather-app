import WeatherSummary from "./WeatherSummary";

const WeatherReport = ({
  weatherData,
  unitSystem,
  isLoading
}) => {
  return (
    <>
      <section>
        <div className="px-6 pt-5 pb-8 md:px-10 lg:px-16 xl:px-30">
          <div className="flex flex-col lg:flex-row lg:items-stretch">
            <WeatherSummary
              address={weatherData?.address}
              currentData={weatherData?.current}
              dailyData={weatherData?.daily}
              unitSystem={unitSystem}
              isLoading={isLoading}
              latitude={weatherData?.latitude}
              longitude={weatherData?.longitude}
              hourlyData={weatherData?.hourly}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default WeatherReport;
