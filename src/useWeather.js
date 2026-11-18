
import { useState, useEffect } from "react";

export function useWeather(city) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        // 1. First fetch city location
        const locationResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city || "Gujranwala")}&count=1`
        );

        const locationData = await locationResponse.json();
        console.log(locationData);

        // 2. Check if city exists
        if (!locationData.results || locationData.results.length === 0) {
          setWeather(null);
          return;
        }

        // 3. Get latitude and longitude
        const latitude = locationData.results[0].latitude;
        const longitude = locationData.results[0].longitude;

        console.log(latitude, longitude);

        // 4. Fetch weather and 5 days forecast
       const response = await fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,apparent_temperature&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=5&timezone=auto`
);

        const data = await response.json();

        setWeather(data);
        console.log(data);
        console.log(data.daily);

      } catch (error) {
        console.log("Error", error);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city]);

  return { weather, loading };
}
