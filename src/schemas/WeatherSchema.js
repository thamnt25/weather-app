
import iconCloudy from "../assets/images/icon-overcast.webp";
import iconDrizzle from "../assets/images/icon-drizzle.webp";
import iconFog from "../assets/images/icon-fog.webp";
import iconPartlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import iconRain from "../assets/images/icon-rain.webp";
import iconSnow from "../assets/images/icon-snow.webp";
import iconStorm from "../assets/images/icon-storm.webp";
import iconSunny from "../assets/images/icon-sunny.webp";

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
