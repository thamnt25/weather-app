import WeatherSummary from "./WeatherSummary";
import HourlyForecast from "./HourlyForecast";

const WeatherReport = () => {
  return (
    <>
      <section>
        <div className="flex flex-col px-10 pt-5 pb-5 md:flex-row md:items-stretch md:px-20 xl:px-30">
          <WeatherSummary />
          <HourlyForecast />
        </div>
      </section>
    </>
  );
};

export default WeatherReport;
