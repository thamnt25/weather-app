import WeatherSummary from "./WeatherSummary";
import HourlyForecast from "./HourlyForecast";

const WeatherReport = () => {
  return (
    <>
      <section>
        <div className="flex flex-col px-6 pt-5 pb-8 md:px-10 lg:flex-row lg:items-stretch lg:px-16 xl:px-30">
          <WeatherSummary />
          <HourlyForecast />
        </div>
      </section>
    </>
  );
};

export default WeatherReport;
