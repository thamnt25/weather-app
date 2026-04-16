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

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env.local`

Add the following variables:

```env
VITE_GEOAPIFY_API_KEY="your_geoapify_api_key"
VITE_URL="https://open-meteo.com"
VITE_DEFAULT_LOCATION={"address":"Delia, Alberta","county":"Delia","country":"Canada","lat":51.63892364501953,"lon":-112.36077117919922}
```

Notes:
- `VITE_DEFAULT_LOCATION` must be valid JSON on a single line.
- `lat` and `lon` are required.
- `city`, `county`, `state`, and `country` are used to build the display address.

### 3. Start the development server

```bash
npm run dev
```

## Available Scripts

- `npm run dev` starts the Vite dev server
- `npm run build` creates a production build
- `npm run preview` previews the production build locally
- `npm run lint` runs ESLint

## Data Sources

### Weather Data

Weather data comes from [Open-Meteo](https://open-meteo.com/). No API key is required for forecast requests used by this app.

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
