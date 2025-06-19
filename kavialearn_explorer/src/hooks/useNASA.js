/**
 * PUBLIC_INTERFACE
 * Hook to fetch/get NASA Astronomy Picture of the Day (APOD) and data.
 * Provides fallback stub when network is unavailable or in dev mode.
 */
import { useCallback } from "react";

// NASA public demo API key (safe for demo; secure in prod)
const NASA_API_KEY = "DEMO_KEY";
const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

export default function useNASA() {
  const nasaImage = "https://apod.nasa.gov/apod/image/1812/IC405_Abolfath_4000.jpg"; // Example fallback image

  // PUBLIC_INTERFACE
  /**
   * Fetches Astronomy Picture of the Day (APOD) (async).
   * @returns {Promise<{ url, title, explanation }>}
   */
  const fetchAPOD = useCallback(async () => {
    try {
      const resp = await fetch(APOD_URL);
      if (!resp.ok) {
        throw new Error("NASA API request failed");
      }
      const data = await resp.json();
      return {
        url: data.url,
        title: data.title,
        explanation: data.explanation,
      };
    } catch (e) {
      // Rethrow to let caller handle error
      throw e;
    }
  }, []);

  // Provide image only for simple consumption (legacy, stub)
  return { nasaImage, fetchAPOD };
}
