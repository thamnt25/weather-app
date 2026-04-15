import "leaflet/dist/leaflet.css";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import { formatTemperature } from "../../schemas/WeatherSchema";

const WeatherMap = ({
  address,
  latitude,
  longitude,
  currentData,
  unitSystem,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="mt-6 rounded-[1.5rem] border border-neutral-600/55 bg-neutral-800/95 p-5 shadow-[0_18px_40px_rgba(3,1,45,0.24)]">
        <div className="loading-shimmer h-[20rem] w-full rounded-[1rem]" />
      </div>
    );
  }

  if (latitude == null || longitude == null) {
    return null;
  }

  const position = [latitude, longitude];

  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-neutral-600/55 bg-neutral-800/95 shadow-[0_18px_40px_rgba(3,1,45,0.24)]">
      <MapContainer
        center={position}
        zoom={10}
        scrollWheelZoom={false}
        className="h-[20rem] w-full rounded-[1rem]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <CircleMarker
          center={position}
          radius={10}
          pathOptions={{
            color: "#ffffff",
            weight: 2,
            fillColor: "#ff7c0a",
            fillOpacity: 1,
          }}
        >
          <Popup>
            <div>
              <strong>{address || "Selected location"}</strong>
              <div>
                {currentData?.temperature != null
                  ? `Current temperature: ${formatTemperature(currentData.temperature, unitSystem)}`
                  : "Weather location"}
              </div>
            </div>
          </Popup>
        </CircleMarker>
      </MapContainer>
    </section>
  );
};

export default WeatherMap;
