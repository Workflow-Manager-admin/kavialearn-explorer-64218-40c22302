import React, { useEffect, useState } from "react";
import useNASA from "../hooks/useNASA";
import useWorldBank from "../hooks/useWorldBank";

// PUBLIC_INTERFACE
/**
 * DataPanel integrates NASA's APOD and World Bank global statistics,
 * utilizing the respective hooks. Shows a space section and a
 * clearly separated World Bank stats section, with robust loading/error UI.
 */
export default function DataPanel() {
  // --- NASA Section ---
  const { nasaImage, fetchAPOD } = useNASA();
  const [apod, setApod] = useState(null);
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --- World Bank Section setup ---
  // Sample indicators: POP (total), GDP (US), Life expectancy
  const { worldBankData: popUSA } = useWorldBank("SP.POP.TOTL", "USA");
  const { worldBankData: gdpDEU } = useWorldBank("NY.GDP.MKTP.CD", "DEU");
  const { worldBankData: healthJPN } = useWorldBank("SP.DYN.LE00.IN", "JPN");

  // WB UI state
  const [wbLoading, setWbLoading] = useState(true);
  const [wbError, setWbError] = useState("");
  const [wbRendered, setWbRendered] = useState(false);

  // List of quick astronomy facts (could be randomized)
  const astronomyFacts = [
    "A day on Venus is longer than a year on Venus.",
    "There are more stars in the universe than grains of sand on Earth.",
    "Jupiter is so big it could fit all the other planets inside it.",
    "Neutron stars can spin at a rate of 600 rotations per second.",
    "A spoonful of a neutron star weighs about a billion tons.",
    "Saturn could float in water because it’s mostly made of gas.",
  ];

  // Fetch APOD data when mounted
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError("");
    const getAPOD = async () => {
      if (typeof fetchAPOD === "function") {
        try {
          const data = await fetchAPOD();
          if (isMounted) setApod(data);
        } catch (e) {
          if (isMounted) setError("Could not retrieve NASA Astronomy Picture.");
        }
      } else {
        // Fallback: stub value (dev)
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

    setFact(astronomyFacts[Math.floor(Math.random() * astronomyFacts.length)]);

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, []);

  // Simulate async World Bank loading/error for stub; update if real API used
  useEffect(() => {
    setWbLoading(true);
    setWbError("");
    // Simulate slight delay for realism/UX even in stub
    const timer = setTimeout(() => {
      // Basic stub: check if we at least get a value for all three indicators
      if (
        popUSA &&
        Array.isArray(popUSA) &&
        popUSA[0]?.value &&
        gdpDEU &&
        Array.isArray(gdpDEU) &&
        gdpDEU[0]?.value &&
        healthJPN &&
        Array.isArray(healthJPN) &&
        healthJPN[0]?.value
      ) {
        setWbRendered(true);
        setWbLoading(false);
      } else {
        setWbError(
          "Could not load global statistics from World Bank API."
        );
        setWbLoading(false);
        setWbRendered(false);
      }
    }, 700);
    return () => clearTimeout(timer);
    // Only on mount or change of stub data
    // eslint-disable-next-line
  }, [popUSA, gdpDEU, healthJPN]);

  // Format helpers
  function formatNumber(n) {
    // Compact format: 1,234,567 => 1.23M, etc.
    if (typeof n !== "number") return "";
    if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
    if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(2) + "K";
    return n.toLocaleString();
  }

  return (
    <section className="panel-section data-panel">
      {/* Space Data Section */}
      <div className="section-label">Space Data & Facts</div>
      <h3>
        <span role="img" aria-label="space">
          🚀
        </span>{" "}
        NASA Astronomy
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
                background: "#e1eafd",
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
                whiteSpace: "nowrap",
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
              fontStyle: "italic",
            }}
          >
            {apod.explanation
              ? apod.explanation.slice(0, 168) +
                (apod.explanation.length > 168 ? "..." : "")
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
        <span role="img" aria-label="star">
          🌟
        </span>{" "}
        Astronomy Fact: <span style={{ fontWeight: 500 }}>{fact}</span>
      </div>

      {/* --- Divider for clarity --- */}
      <div
        style={{
          borderTop: "1.3px dashed var(--border-color, #e9eef3)",
          margin: "27px 0 16px 0",
          width: "100%",
          opacity: 0.77,
        }}
        aria-hidden="true"
      />

      {/* World Bank Data Section */}
      <div className="section-label" style={{ background: "#e7fef5", color: "#18b48d" }}>
        🌐 Global Statistics (World Bank)
      </div>
      <h3 style={{ color: "#18b48d" }}>Key Country Indicators</h3>
      {wbLoading ? (
        <div className="placeholder-visual" style={{ minHeight: 65 }}>
          Loading World Bank statistics...
        </div>
      ) : wbError ? (
        <div
          style={{
            background: "#f6fcfb",
            color: "#189481",
            border: "1.5px solid #cef5ed",
            borderRadius: 8,
            padding: "13px 14px",
            fontSize: "1rem",
            marginBottom: 10,
          }}
        >
          {wbError}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          <div
            style={{
              background: "#edfcfc",
              borderLeft: "5px solid #18b48d",
              borderRadius: 7,
              padding: "8px 13px 7px 15px",
            }}
          >
            <strong>🇺🇸 USA Population:</strong>{" "}
            <span style={{ color: "#189481", fontWeight: 600 }}>
              {popUSA && Array.isArray(popUSA)
                ? formatNumber(popUSA[0]?.value)
                : "--"}
            </span>{" "}
            <span style={{ color: "#888", marginLeft: 6, fontSize: "0.91em" }}>
              {popUSA && popUSA[0]?.year ? ` (Year: ${popUSA[0].year})` : ""}
            </span>
          </div>
          <div
            style={{
              background: "#edfcfa",
              borderLeft: "5px solid #16a071",
              borderRadius: 7,
              padding: "8px 13px 7px 15px",
            }}
          >
            <strong>🇩🇪 Germany GDP (USD):</strong>{" "}
            <span style={{ color: "#168772", fontWeight: 600 }}>
              $
              {gdpDEU && Array.isArray(gdpDEU)
                ? formatNumber(gdpDEU[0]?.value)
                : "--"}
            </span>
            <span style={{ color: "#888", marginLeft: 6, fontSize: "0.91em" }}>
              {gdpDEU && gdpDEU[0]?.year ? ` (Year: ${gdpDEU[0].year})` : ""}
            </span>
          </div>
          <div
            style={{
              background: "#fbf7eb",
              borderLeft: "5px solid #f7ca14",
              borderRadius: 7,
              padding: "8px 13px 7px 15px",
            }}
          >
            <strong>🇯🇵 Japan Life Expectancy:</strong>{" "}
            <span style={{ color: "#d1a126", fontWeight: 600 }}>
              {healthJPN && Array.isArray(healthJPN)
                ? Number(healthJPN[0]?.value).toFixed(1)
                : "--"}{" "}
              years
            </span>
            <span style={{ color: "#888", marginLeft: 6, fontSize: "0.91em" }}>
              {healthJPN && healthJPN[0]?.year ? ` (Year: ${healthJPN[0].year})` : ""}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
