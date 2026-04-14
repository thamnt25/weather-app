import iconSearch from "../../assets/images/icon-search.svg";
import { useState } from "react";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import { getWeather } from "../../services/WeatherService";

const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

const Search = ({ setWeatherData, setIsLoading }) => {
  const [location, setLocation] = useState("");

  function onPlaceSelect(value) {
    setLocation(value?.properties);
  }

  async function searchWeather() {
    if (!location) return;

    setIsLoading(true);
    const address = `${location?.city ? location?.city : location?.county}, ${location?.state ? location?.state : location?.country}`;

    try {
      const res = await getWeather(location?.lat, location?.lon, address);
      setWeatherData(res);
    } finally {
      setIsLoading(false);
    }
  }

  function onSuggectionChange(value) {
    console.log(value);
  }

  return (
    <>
      <section className="mt-10 flex flex-col gap-8 px-6 md:px-10 xl:mt-14 xl:items-center xl:px-0">
        <span className="text-center text-4xl font-bold text-white xl:text-5xl">
          How&apos;s the sky looking today?
        </span>

        <div className="flex w-full max-w-[31rem] flex-col gap-3 md:max-w-[34rem] md:flex-row md:items-center">
          <div className="search-autocomplete flex h-12 flex md:flex-1 items-center gap-3 rounded-xl border border-neutral-600/70 bg-neutral-800 px-4 shadow-[0_14px_30px_rgba(3,1,45,0.2)] transition-colors focus-within:border-blue-500/70">
            <img src={iconSearch} alt="" className="h-4 w-4 opacity-90" />
            <div className="h-full w-full flex items-center ">
              <GeoapifyContext apiKey={apiKey}>
                <GeoapifyGeocoderAutocomplete
                  placeSelect={onPlaceSelect}
                  suggestionsChange={onSuggectionChange}
                  placeholder="Search for a place..."
                  limit={5}
                  className="h-full w-full bg-transparent text-base font-medium text-white placeholder:text-neutral-300/90 outline-none"
                />
              </GeoapifyContext>
            </div>
          </div>

          <button
            onClick={searchWeather}
            type="button"
            className="h-12 w-full rounded-xl bg-blue-500 px-6 text-base font-semibold text-white shadow-[0_16px_30px_rgba(68,85,218,0.35)] transition-all hover:bg-blue-700 md:w-auto"
          >
            Search
          </button>
        </div>
      </section>
    </>
  );
};

export default Search;
