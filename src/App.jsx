import { useState } from "react";
import Header from "./components/sections/Header";
import Search from "./components/sections/Search";
import WeatherReport from "./components/sections/WeatherReport";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [unitSystem, setUnitSystem] = useState("metric");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="min-h-screen bg-neutral-900">
      <Header unitSystem={unitSystem} setUnitSystem={setUnitSystem} />
      <Search setWeatherData={setWeatherData} setIsLoading={setIsLoading} />
      <WeatherReport
        weatherData={weatherData}
        unitSystem={unitSystem}
        isLoading={isLoading}
      />
    </main>
  );
}

export default App;
