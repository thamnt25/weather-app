import iconDrizzle from "../../assets/images/icon-drizzle.webp";
import iconFrog from "../../assets/images/icon-fog.webp";
import iconOverCast from "../../assets/images/icon-overcast.webp";
import iconPartlyCloudy from "../../assets/images/icon-partly-cloudy.webp";
import iconRain from "../../assets/images/icon-rain.webp";
import iconSnow from "../../assets/images/icon-snow.webp";
import iconStorm from "../../assets/images/icon-storm.webp";
import iconSunny from "../../assets/images/icon-sunny.webp";

const WeatherSummary = () => {
  const weatherDetails = [
    {
      id: 1,
      title: "Feels Like",
      value: "18",
    },
    {
      id: 2,
      title: "Huminity",
      value: "46%",
    },
    {
      id: 3,
      title: "Wind",
      value: "14 km/h",
    },
    {
      id: 4,
      title: "Precipitation",
      value: "0 mm",
    },
  ];

  const dailyForecast = [
    {
      id: 1,
      date: "Tue",
      icon: iconRain,
      maxTemperature: 20,
      minTemperature: 14,
    },
    {
      id: 2,
      date: "Wed",
      icon: iconRain,
      maxTemperature: 20,
      minTemperature: 14,
    },
    {
      id: 3,
      date: "Thu",
      icon: iconSunny,
      maxTemperature: 20,
      minTemperature: 14,
    },
    {
      id: 4,
      date: "Fri",
      icon: iconDrizzle,
      maxTemperature: 20,
      minTemperature: 14,
    },
    {
      id: 5,
      date: "Sat",
      icon: iconFrog,
      maxTemperature: 20,
      minTemperature: 14,
    },
    {
      id: 6,
      date: "Sun",
      icon: iconStorm,
      maxTemperature: 20,
      minTemperature: 14,
    },
    {
      id: 7,
      date: "Mon",
      icon: iconRain,
      maxTemperature: 20,
      minTemperature: 14,
    },
  ];
  return (
    <>
      <div className="flex flex-col w-full">
        <div>
          <div className="hero-summary flex flex-col md:flex-row items-center md:justify-between rounded-md py-10 md:py-15 xl:py-20 mt-5 px-10">
            <div className="flex flex-col items-center  text-white">
              <span className="text-xl font-semibold">Berlin, Germany</span>
              <span className="text-sm font-normal">Tuseday Apr 13</span>
            </div>
            <div className="flex flex-row items-center">
              <img src={iconSunny} alt="weatherIcon" className="h-30 w-30" />
              <span className="text-5xl text-white font-bold italic ">
                20°C
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {weatherDetails.map((data) => (
              <div
                key={data.id}
                className=" flex flex-col bg-neutral-800 border border-neutral-600/55 gap-6 py-2 md:py-4 px-3 md:px-5 xl:px-10 rounded-lg justify-start"
              >
                <span className="text-neutral-200 text-base font-semibold">
                  {data.title}
                </span>
                <span className="text-white text-lg">{data.value}</span>
              </div>
            ))}
            ;
          </div>
        </div>
        <div>
          <span className="text-white text-xl font-semibold">
            Daily Forecast
          </span>
          <div className="grid grid-cols-3 md:grid-cols-7 gap-4 mt-5">
            {dailyForecast.map((data) => (
              <div
                key={data.id}
                className="flex flex-col items-center rounded-md bg-neutral-800 text-white gap-4 py-2"
              >
                <span className="text-base">{data.date}</span>
                <img
                  src={data.icon}
                  alt="weather-icon"
                  className="h-10 w-10"
                />
                <div className="w-full flex flex-row justify-between px-3">
                  <span className="text-base">{data.maxTemperature}</span>
                  <span className="text-base">{data.minTemperature}</span>
                </div>
              </div>
            ))}
            ;
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherSummary;
