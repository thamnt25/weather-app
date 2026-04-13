import iconSearch from "../../assets/images/icon-search.svg";
import { useState } from "react";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import { getWeather } from "../../services/WeatherSercive";

const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

const Search = () => {
  const [location, setLocation] = useState("");

  function onPlaceSelect(value) {
    setLocation(value?.properties);
  }

  async function searchWeather() {
    if (!location) return;
    const res = await getWeather(location?.lat, location?.lon);
    console.log(res);
  }

  //   {
  //     "type": "Feature",
  //     "properties": {
  //         "country": "Canada",
  //         "country_code": "ca",
  //         "state": "Alberta",
  //         "city": "Calgary",
  //         "postcode": "T3H 2T1",
  //         "suburb": "Strathcona Park",
  //         "street": "Straddock Crescent SW",
  //         "datasource": {
  //             "sourcename": "openstreetmap",
  //             "attribution": "© OpenStreetMap contributors",
  //             "license": "Open Database License",
  //             "url": "https://www.openstreetmap.org/copyright"
  //         },
  //         "state_code": "AB",
  //         "lon": -114.1845258,
  //         "lat": 51.0496697,
  //         "housenumber": "84",
  //         "result_type": "building",
  //         "formatted": "84 Straddock Crescent SW, Calgary, AB T3H 2T1, Canada",
  //         "address_line1": "84 Straddock Crescent SW",
  //         "address_line2": "Calgary, AB T3H 2T1, Canada",
  //         "timezone": {
  //             "name": "America/Edmonton",
  //             "offset_STD": "-07:00",
  //             "offset_STD_seconds": -25200,
  //             "offset_DST": "-06:00",
  //             "offset_DST_seconds": -21600,
  //             "abbreviation_STD": "MST",
  //             "abbreviation_DST": "MDT"
  //         },
  //         "plus_code": "95372RX8+V5",
  //         "plus_code_short": "2RX8+V5 Calgary, Alberta, Canada",
  //         "iso3166_2": "CA-AB",
  //         "rank": {
  //             "confidence": 1,
  //             "confidence_street_level": 1,
  //             "confidence_building_level": 1,
  //             "match_type": "full_match"
  //         },
  //         "place_id": "512b114d45cf8b5cc059138da4935b864940c00203e203266f70656e6164647265737365733a616464726573733a62363462326238343932363165633839"
  //     },
  //     "geometry": {
  //         "type": "Point",
  //         "coordinates": [
  //             -114.1845258,
  //             51.0496697
  //         ]
  //     },
  //     "bbox": [
  //         -114.1876542,
  //         51.0495476,
  //         -114.1844259,
  //         51.0502934
  //     ]
  // }

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
