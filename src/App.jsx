import Header from "./components/sections/Header";
import Search from "./components/sections/Search";
import WeatherReport from "./components/sections/WeatherReport";
import "./App.css";

function App() {
  return (
    <main className="min-h-screen bg-neutral-900">
      <Header />
      <Search />
      <WeatherReport />
    </main>
  );
}

export default App;
