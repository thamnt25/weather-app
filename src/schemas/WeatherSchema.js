import iconCloudy from "../assets/images/icon-overcast.webp";
import iconDrizzle from "../assets/images/icon-drizzle.webp";
import iconFog from "../assets/images/icon-fog.webp";
import iconPartlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import iconRain from "../assets/images/icon-rain.webp";
import iconSnow from "../assets/images/icon-snow.webp";
import iconStorm from "../assets/images/icon-storm.webp";
import iconSunny from "../assets/images/icon-sunny.webp";

const shiftedTimeZone = "UTC";

export function getWeatherCondition(weatherCode, isDay) {
  if (weatherCode === 0) return isDay ? "sunny" : "clear-night";
  if ([1].includes(weatherCode)) return isDay ? "mostly-sunny" : "mostly-clear";
  if ([2].includes(weatherCode)) return "partly-cloudy";
  if ([3].includes(weatherCode)) return "cloudy";
  if ([45, 48].includes(weatherCode)) return "fog";
  if ([51, 53, 55, 56, 57].includes(weatherCode)) return "drizzle";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) return "rain";
  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) return "snow";
  if ([95, 96, 99].includes(weatherCode)) return "thunderstorm";
  return "unknown";
}

export function getWeatherIcon(weatherCode, isDay) {
  const condition = getWeatherCondition(weatherCode, isDay);

  if (condition === "sunny" || condition === "clear-night") {
    return { icon: iconSunny, des: condition };
  }

  if (
    condition === "mostly-sunny" ||
    condition === "mostly-clear" ||
    condition === "partly-cloudy"
  ) {
    return { icon: iconPartlyCloudy, des: condition };
  }

  if (condition === "cloudy") {
    return { icon: iconCloudy, des: condition };
  }

  if (condition === "fog") {
    return { icon: iconFog, des: condition };
  }

  if (condition === "drizzle") {
    return { icon: iconDrizzle, des: condition };
  }

  if (condition === "rain") {
    return { icon: iconRain, des: condition };
  }

  if (condition === "snow") {
    return { icon: iconSnow, des: condition };
  }

  if (condition === "thunderstorm") {
    return { icon: iconStorm, des: condition };
  }

  return { icon: iconSunny, des: condition };
}

export function formatDailyForecast(daily) {
  const data = daily.time.map((date, index) => ({
    id: index + 1,
    date: date.toLocaleDateString("en-US", {
      weekday: "short",
      timeZone: shiftedTimeZone,
    }),
    weatherCode: daily.weather_code[index],
    icon: getWeatherIcon(daily.weather_code[index], 1),
    maxTemperature: Math.round(daily.temperature_2m_max[index]),
    minTemperature: Math.round(daily.temperature_2m_min[index]),
    windSpeedMax: Math.round(daily.wind_speed_10m_max[index]),
    windGustsMax: Math.round(daily.wind_gusts_10m_max[index]),
  }));
  return data;
}

export function formatHourlyForecast(hourly) {
  const data = {};
  for (let i = 0; i < hourly.time.length; i++) {
    const date = hourly.time[i].toLocaleDateString("en-US", {
      weekday: "short",
      timeZone: shiftedTimeZone,
    });
    const hourData = {
      time: hourly.time[i].toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: true,
        timeZone: shiftedTimeZone,
      }),
      weatherCode: hourly.weather_code[i],
      isDay: hourly.is_day[i],
      icon: getWeatherIcon(hourly.weather_code[i], hourly.is_day[i]),
      temperature: Math.round(hourly.temperature_2m[i]),
      ux: Math.round(hourly.uv_index[i]),
      visibility: Math.round(hourly.visibility[i]),
      humidity: Math.round(hourly.relative_humidity_2m[i]),
      windSpeed: Math.round(hourly.wind_speed_10m[i]),
    };

    if (!Object.hasOwn(data, date)) {
      data[date] = [];
    }
    data[date].push(hourData);
  }
  return data;
}

export function formatCurrentForecast(current) {
  const data = {
    time: current.time.toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
      timeZone: shiftedTimeZone,
    }),
    temperature: Math.round(current.temperature_2m),
    apparentTemperature: Math.round(current.apparent_temperature),
    humidity: Math.round(current.relative_humidity_2m),
    weatherCode: current.weather_code,
    cloudCover: current.cloud_cover,
    windSpeed: Math.round(current.wind_speed_10m),
    dewPoint: Math.round(current.dew_point_2m),
    visibility: Math.round(current.visibility),
    uxIndex: Math.round(current.uv_index),
    isDay: current.is_day,
    precipitation: current.precipitation,
    pressure: Math.round(current.pressure_msl),
    icon: getWeatherIcon(current.weather_code, current.is_day),
  };
  return data;
}

export function formatTemperature(value, unitSystem = "metric") {
  if (value == null) return "--";

  if (unitSystem === "imperial") {
    return `${Math.round((value * 9) / 5 + 32)}°F`;
  }

  return `${Math.round(value)}°C`;
}

export function formatWindSpeed(value, unitSystem = "metric") {
  if (value == null) return "--";

  if (unitSystem === "imperial") {
    return `${Math.round(value * 0.621371)} mph`;
  }

  return `${Math.round(value)} km/h`;
}

export function formatPrecipitation(value, unitSystem = "metric") {
  if (value == null) return "--";

  if (unitSystem === "imperial") {
    return `${(value / 25.4).toFixed(2)} in`;
  }

  return `${value.toFixed(1)} mm`;
}

export function filterData(hourlyData, weatherState, selectedDay) {
  const allDataByDay = hourlyData?.[selectedDay] ?? [];
  if (weatherState === 1) {
    return allDataByDay.map((data) => ({
      icon: data.icon,
      value: data.temperature,
      time: data.time,
    }));
  }

  if (weatherState === 2) {
    return allDataByDay.map((data) => ({
      icon: data.icon,
      value: data.ux,
      time: data.time,
    }));
  }

  if (weatherState === 3) {
    return allDataByDay.map((data) => ({
      icon: data.icon,
      value: data.windSpeed,
      time: data.time,
    }));
  }

  if (weatherState === 4) {
    return allDataByDay.map((data) => ({
      icon: data.icon,
      value: data.humidity,
      time: data.time,
    }));
  }

  if (weatherState === 5) {
    return allDataByDay.map((data) => ({
      icon: data.icon,
      value: data.visibility,
      time: data.time,
    }));
  }

  return [];
}
