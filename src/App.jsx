
import React, { useState } from "react";
import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  Wind,
  Droplets,
  Search,
  MapPin,
} from "lucide-react";
import { useWeather } from "./useWeather";

function App() {

  const [city,setCity] = useState("")
  const { weather, loading } = useWeather(city);

  const handleSearch = () => {

  console.log(city);
};


const getWeatherIcon = (code) => {
  if (code === 0) {
    return <Sun className="mx-auto my-3 text-yellow-400" size={30} />;
  } 
  else if (code >= 1 && code <= 3) {
    return <CloudSun className="mx-auto my-3 text-yellow-400" size={30} />;
  } 
  else if (code === 45 || code === 48) {
    return <Cloud className="mx-auto my-3 text-gray-300" size={30} />;
  } 
  else if (code >= 51 && code <= 82) {
    return <CloudRain className="mx-auto my-3 text-blue-400" size={30} />;
  } 
  else if (code >= 95 && code <= 99) {
    return <CloudRain className="mx-auto my-3 text-blue-400" size={30} />;
  }
  
  return <Cloud className="mx-auto my-3 text-gray-300" size={30} />;
};


const getWeatherCondition = (code) => {
  if (code === 0) return "Clear Sky";
  if (code <= 3) return "Partly Cloudy";
  if (code === 45 || code === 48) return "Foggy";
  if (code >= 51 && code <= 67) return "Rainy";
  if (code >= 71 && code <= 77) return "Snowy";
  if (code >= 80 && code <= 82) return "Rain Showers";
  if (code >= 95) return "Thunderstorm";

  return "Unknown";
};



const getMainWeatherIcon = (code) => {
  if (code === 0) {
    return <Sun size={140} className="text-yellow-300 mt-6 md:mt-0" />;
  }

  if (code >= 1 && code <= 3) {
    return <CloudSun size={140} className="text-yellow-300 mt-6 md:mt-0" />;
  }

  if (code === 45 || code === 48) {
    return <Cloud size={140} className="text-gray-300 mt-6 md:mt-0" />;
  }

  if (code >= 51 && code <= 82) {
    return <CloudRain size={140} className="text-blue-300 mt-6 md:mt-0" />;
  }

  if (code >= 95) {
    return <CloudRain size={140} className="text-blue-300 mt-6 md:mt-0" />;
  }

  return <Cloud size={140} className="text-gray-300 mt-6 md:mt-0" />;
};




  return (
    <div className="min-h-screen bg-slate-950 text-white p-5 md:p-10">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Sun className="text-yellow-400" size={30} />
            Weatherly
          </h1>
          <p className="text-gray-400">Weather Dashboard</p>
        </div>

        {/* Search */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city, Country"
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-3 px-4 pr-12 outline-none focus:border-blue-400"
            />

          <button
  type="button"
  onClick={handleSearch}
  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-gray-400 hover:text-white cursor-pointer"
>
  <Search size={20} />
</button>
          </div>
        </div>

        {/* Location */}
       <div className="flex items-center gap-2 text-gray-400 mb-5">
  <MapPin size={18} />
  <p>{city ? `${city}, Pakistan` : "Gujranwala, Pakistan"}</p>
</div>

        {/* Main Weather Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl p-8 md:p-12 shadow-xl mb-6">

          <div className="flex flex-col md:flex-row items-center justify-between">

            <div>
              <p className="text-blue-100 text-lg">Today's Weather</p>

              <h2 className="text-7xl font-bold my-4">
                28°
              </h2>

              <p className="text-xl">
  {weather?.current
    ? getWeatherCondition(weather.current.weather_code)
    : "Loading..."}
</p>
              Feels like {weather?.current?.apparent_temperature ?? "--"}°C
            </div>

            {weather?.current
  ? getMainWeatherIcon(weather.current.weather_code)
  : <CloudSun size={140} />}

          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

          <div className="bg-slate-800 rounded-2xl p-6">
            <Droplets className="text-blue-400 mb-3" size={28} />
            <p className="text-gray-400">Humidity</p>
            <h3 className="text-2xl font-bold mt-2">
  {weather?.current?.relative_humidity_2m ?? "--"}%
</h3>
          </div>

          <div className="bg-slate-800 rounded-2xl p-6">
            <Wind className="text-cyan-400 mb-3" size={28} />
            <p className="text-gray-400">Wind Speed</p>
            <h3 className="text-2xl font-bold mt-2">
  {weather?.current?.wind_speed_10m ?? "--"} km/h
</h3>
          </div>

          <div className="bg-slate-800 rounded-2xl p-6">
  <Sun className="text-yellow-400 mb-3" size={28} />

  <h3 className="text-2xl font-bold mt-2">
    {weather?.current?.uv_index ?? "--"}
  </h3>

  <p className="text-sm text-gray-400 mt-1">UV Index</p>
</div>

        </div>

        {/* Forecast */}
        <div className="bg-slate-800 rounded-2xl p-6">

          <h2 className="text-xl font-bold mb-6">
            5 Days Forecast
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-5 text-center">

            
{weather?.daily?.time?.map((date, index) => (
  <div key={date}>
    <p className="text-gray-400">
      {new Date(date).toLocaleDateString("en-US", {
        weekday: "short",
      })}
    </p>

   {getWeatherIcon(weather.daily.weather_code[index])}

    <p className="font-bold">
      {weather.daily.temperature_2m_max[index]}°C
    </p>

    <p className="text-gray-400 text-sm">
      {weather.daily.temperature_2m_min[index]}°C
    </p>
  </div>
))}

          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
