import React, { useEffect, useState } from "react";
import useNASA from "../hooks/useNASA";

// PUBLIC_INTERFACE
/**
 * DataPanel integrates NASA's Astronomy Picture of the Day (APOD)
 * and facts, utilizing the useNASA hook. Displays astronomy picture,
 * information, loading indicators, and error state.
 */
export default function DataPanel() {
  const { nasaImage, fetchAPOD } = useNASA();
  const [apod, setApod] = useState(null);
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // List of quick astronomy facts (could be randomized)
  const astronomyFacts = [
    "A day on Venus is longer than a year on Venus.",
    "There are more stars in the universe than grains of sand on Earth.",
    "Jupiter is so big it could fit all the other planets inside it.",
    "Neutron stars can spin at a rate of 600 rotations per second.",
    "A spoonful of a neutron star weighs about a billion tons.",
    "Saturn could float in water because it’s mostly made of gas."
  ];

  // Fetch APOD data when mounted
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError("");
    // Try to use real API logic; fallback to stub if unavailable
    const getAPOD = async () => {
      if (typeof fetchAPOD === "function") {
        try {
          const data = await fetchAPOD();
          if (isMounted) setApod(data);
        } catch (e) {
          if (isMounted) setError("Could not retrieve NASA Astronomy Picture.");
        }
      } else {
        // Fallback: stub value from nasaImage (for development)
        setApod({
          url: nasaImage,
          title: "IC 405: Flaming Star Nebula",
          explanation:
            "This image, the Flaming Star Nebula, glows due to energy from a bright O-type star. Captured by NASA's APOD archive.",
        });
      }
      setLoading(false);
    };
    getAPOD();

    // Pick a random astronomy fact
    setFact(
      astronomyFacts[Math.floor(Math.random() * astronomyFacts.length)]
    );

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, []);

  return (
    <section className="panel-section data-panel">
      <div className="section-label">Space Data & Facts</div>
      <h3>
        <span role="img" aria-label="space">🚀</span> NASA Astronomy
      </h3>
      {loading ? (
        <div className="placeholder-visual" style={{ minHeight: 80 }}>
          Loading NASA Astronomy Picture of the Day...
        </div>
      ) : error ? (
        <div
          style={{
            background: "#fff0ef",
            color: "#b54227",
            border: "1.5px solid #efb4b0",
            borderRadius: 8,
            padding: "13px 14px",
            fontSize: "1rem",
            marginBottom: 10,
          }}
        >
          {error}
        </div>
      ) : apod ? (
        <div>
          <div
            style={{
              background: "#f2f7fb",
              border: "1.5px solid #a7dbef",
              borderRadius: 10,
              marginBottom: 12,
              textAlign: "center",
              padding: 10,
            }}
          >
            <img
              src={apod.url}
              alt={apod.title}
              style={{
                width: "100%",
                maxWidth: 260,
                maxHeight: 168,
                objectFit: "cover",
                borderRadius: 8,
                margin: "0 auto",
                background: "#e1eafd"
              }}
            />
            <div
              style={{
                fontWeight: 700,
                color: "var(--secondary)",
                marginTop: 8,
                fontSize: "1.02rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}
              title={apod.title}
            >
              {apod.title}
            </div>
          </div>
          <div
            style={{
              color: "#155e35",
              background: "#e5fae6",
              borderLeft: "3.5px solid #50e3c2",
              borderRadius: 7,
              padding: "10px 13px",
              fontSize: "0.97rem",
              marginBottom: 10,
              minHeight: 38,
              fontStyle: "italic"
            }}
          >
            {apod.explanation
              ? apod.explanation.slice(0, 168) + (apod.explanation.length > 168 ? "..." : "")
              : "No explanation available for this image."}
          </div>
        </div>
      ) : (
        <div className="placeholder-visual">
          Could not load Astronomy Picture of the Day.
        </div>
      )}
      <div
        style={{
          background: "#fbf8e7",
          color: "#c08203",
          border: "1.3px solid #f6dfad",
          borderRadius: 8,
          padding: "10px 12px",
          fontSize: "1rem",
          marginTop: 12,
        }}
      >
        <span role="img" aria-label="star">🌟</span> Astronomy Fact:{" "}
        <span style={{ fontWeight: 500 }}>{fact}</span>
      </div>
    </section>
  );
}
