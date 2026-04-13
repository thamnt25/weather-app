import { fetchWeatherApi } from "openmeteo";

const url = "https://api.open-meteo.com/v1/forecast";

export async function getWeather(latitude, longitude) {
  const params = {
    latitude,
    longitude,
    timezone: "auto",
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "weather_code",
      "cloud_cover",
      "pressure_msl",
      "wind_speed_10m",
      "wind_direction_10m",
      "visibility",
      "dew_point_2m",
      "uv_index",
      "is_day",
      "precipitation",
      "rain",
      "showers",
      "snowfall",
    ],
    hourly: [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "precipitation_probability",
      "precipitation",
      "rain",
      "showers",
      "snowfall",
      "cloud_cover",
      "weather_code",
      "visibility",
      "pressure_msl",
      "wind_speed_10m",
      "wind_direction_10m",
      "uv_index",
      "is_day",
    ],
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "apparent_temperature_max",
      "apparent_temperature_min",
      "precipitation_sum",
      "rain_sum",
      "showers_sum",
      "snowfall_sum",
      "precipitation_probability_max",
      "wind_speed_10m_max",
      "wind_gusts_10m_max",
      "sunrise",
      "sunset",
      "uv_index_max",
      "sunshine_duration",
    ],
    forecast_days: 7,
  };

  const responses = await fetchWeatherApi(url, params);
  const response = responses[0];

  const utcOffsetSeconds = response.utcOffsetSeconds();
  const current = response.current();
  const hourly = response.hourly();
  const daily = response.daily();

  const hourlyTime = Array.from(
    {
      length:
        (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval(),
    },
    (_, i) =>
      new Date(
        (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
          1000,
      ),
  );

  const dailyTime = Array.from(
    {
      length:
        (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval(),
    },
    (_, i) =>
      new Date(
        (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000,
      ),
  );

  const sunriseValues = daily.variables(12);
  const sunsetValues = daily.variables(13);

  const sunrise = Array.from(
    { length: sunriseValues.valuesInt64Length() },
    (_, i) => new Date(Number(sunriseValues.valuesInt64(i)) * 1000),
  );

  const sunset = Array.from(
    { length: sunsetValues.valuesInt64Length() },
    (_, i) => new Date(Number(sunsetValues.valuesInt64(i)) * 1000),
  );

  return {
    latitude: response.latitude(),
    longitude: response.longitude(),
    elevation: response.elevation(),
    utcOffsetSeconds,
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature_2m: current.variables(0).value(),
      relative_humidity_2m: current.variables(1).value(),
      apparent_temperature: current.variables(2).value(),
      weather_code: current.variables(3).value(),
      cloud_cover: current.variables(4).value(),
      pressure_msl: current.variables(5).value(),
      wind_speed_10m: current.variables(6).value(),
      wind_direction_10m: current.variables(7).value(),
      visibility: current.variables(8).value(),
      dew_point_2m: current.variables(9).value(),
      uv_index: current.variables(10).value(),
      is_day: current.variables(11).value(),
      precipitation: current.variables(12).value(),
      rain: current.variables(13).value(),
      showers: current.variables(14).value(),
      snowfall: current.variables(15).value(),
    },
    hourly: {
      time: hourlyTime,
      temperature_2m: hourly.variables(0).valuesArray(),
      apparent_temperature: hourly.variables(1).valuesArray(),
      relative_humidity_2m: hourly.variables(2).valuesArray(),
      precipitation_probability: hourly.variables(3).valuesArray(),
      precipitation: hourly.variables(4).valuesArray(),
      rain: hourly.variables(5).valuesArray(),
      showers: hourly.variables(6).valuesArray(),
      snowfall: hourly.variables(7).valuesArray(),
      cloud_cover: hourly.variables(8).valuesArray(),
      weather_code: hourly.variables(9).valuesArray(),
      visibility: hourly.variables(10).valuesArray(),
      pressure_msl: hourly.variables(11).valuesArray(),
      wind_speed_10m: hourly.variables(12).valuesArray(),
      wind_direction_10m: hourly.variables(13).valuesArray(),
      uv_index: hourly.variables(14).valuesArray(),
      is_day: hourly.variables(15).valuesArray(),
    },
    daily: {
      time: dailyTime,
      weather_code: daily.variables(0).valuesArray(),
      temperature_2m_max: daily.variables(1).valuesArray(),
      temperature_2m_min: daily.variables(2).valuesArray(),
      apparent_temperature_max: daily.variables(3).valuesArray(),
      apparent_temperature_min: daily.variables(4).valuesArray(),
      precipitation_sum: daily.variables(5).valuesArray(),
      rain_sum: daily.variables(6).valuesArray(),
      showers_sum: daily.variables(7).valuesArray(),
      snowfall_sum: daily.variables(8).valuesArray(),
      precipitation_probability_max: daily.variables(9).valuesArray(),
      wind_speed_10m_max: daily.variables(10).valuesArray(),
      wind_gusts_10m_max: daily.variables(11).valuesArray(),
      sunrise,
      sunset,
      uv_index_max: daily.variables(14).valuesArray(),
      sunshine_duration: daily.variables(15).valuesArray(),
    },
  };
}
