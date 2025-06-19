/**
 * PUBLIC_INTERFACE
 * Hook for OpenWeatherMap weather data (stub).
 */
export default function useWeather(city = "London") {
  // TODO: Use actual weather API
  const weather = { city, temp: 20, desc: "Partly Cloudy" };
  const weatherHistory = [];
  return { weather, weatherHistory };
}
