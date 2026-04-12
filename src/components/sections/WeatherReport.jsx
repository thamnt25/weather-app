import WeatherSummary from "./WeatherSummary";
import WeatherDailyDetail from "./WeatherDailyDetail";

const WeatherReport = () => {
  return (
    <>
      <section>
        <div>
          <WeatherSummary />
          <WeatherDailyDetail />
        </div>
      </section>
    </>
  );
};

export default WeatherReport;
