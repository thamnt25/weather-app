# Weather App

A React weather dashboard built with Vite, Tailwind CSS, Open-Meteo, Geoapify autocomplete, Recharts, and Leaflet.

![Design preview for the Weather app](./preview.jpg)

## Features

- Search for a location with Geoapify autocomplete
- Load a default location automatically when the app opens
- View current weather conditions and supporting metrics
- Browse a 7-day forecast
- Inspect hourly forecast data by selected day
- Switch between metric and imperial units
- View location details on an interactive map

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- Open-Meteo API
- Geoapify React Geocoder Autocomplete
- Recharts
- React Leaflet

## Available Scripts

- `npm run dev` starts the Vite dev server
- `npm run build` creates a production build
- `npm run preview` previews the production build locally

## Data Sources

### Weather Data

Weather data comes from the Open-Meteo forecast API. No API key is required for the forecast requests used by this app.

### Location Search

Location search uses [Geoapify](https://www.geoapify.com/). You need a Geoapify API key for the autocomplete input.

## Project Structure

```text
src/
  components/
    sections/
  schemas/
  services/
```

- `src/components/sections` contains the UI sections
- `src/services/WeatherService.js` fetches and assembles API data
- `src/schemas/WeatherSchema.js` formats weather data for the UI

## Notes

- Time values are normalized so daily and hourly forecasts stay aligned for the selected location.
- If you change `.env.local`, restart the dev server so Vite reloads the environment variables.
