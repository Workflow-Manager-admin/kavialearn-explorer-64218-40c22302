import React, { useState } from "react";
import useWikipedia from "../hooks/useWikipedia";
import useQuote from "../hooks/useQuote";
import useJoke from "../hooks/useJoke";

// PUBLIC_INTERFACE
export default function InteractionPanel() {
  // Wikipedia input state
  const [topic, setTopic] = useState("");
  const [submittedTopic, setSubmittedTopic] = useState("");
  const [wikiLoading, setWikiLoading] = useState(false);
  const [wikiError, setWikiError] = useState("");
  // The hook always runs for the latest submittedTopic - not on every keystroke
  const { summary } = useWikipedia(submittedTopic);

  // Motivation/Joke toggle state
  const [funMode, setFunMode] = useState("quote"); // "quote" or "joke"
  const [funLoading, setFunLoading] = useState(false);
  const [funError, setFunError] = useState("");
  const [funDisplay, setFunDisplay] = useState(""); // Shown quote or joke
  const [hasLoaded, setHasLoaded] = useState(false);

  // Quote/Joke hooks (wired to stub or API)
  const { quote } = useQuote();
  const { joke } = useJoke();

  // Handles topic lookup when form is submitted
  const handleWikiLookup = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setWikiError("");
    setWikiLoading(true);
    // Simulate async load, even if hook is sync (stub)
    setTimeout(() => {
      // Error if empty or summary contains "not found"
      if (!summary || summary.toLowerCase().includes("not found")) {
        setWikiError("No summary found for this topic.");
        setWikiLoading(false);
        setSubmittedTopic(topic.trim());
      } else {
        setSubmittedTopic(topic.trim());
        setWikiError("");
        setWikiLoading(false);
      }
    }, 380); // short delay for user feedback
  };

  // Fetch random quote or joke (on click or mode switch)
  const fetchFunContent = async (mode) => {
    setFunLoading(true);
    setFunError("");
    setFunDisplay("");
    setHasLoaded(true);

    try {
      // Replace with real async fetches if using real APIs
      if (mode === "quote") {
        // Simulate API latency (stub for assignment); replace with 'await fetch...' for real API
        await new Promise((res) => setTimeout(res, 350));
        if (!quote) throw new Error("Could not fetch quote.");
        setFunDisplay(quote);
      } else {
        await new Promise((res) => setTimeout(res, 350));
        if (!joke) throw new Error("Could not fetch joke.");
        setFunDisplay(joke);
      }
    } catch (e) {
      setFunError("Oops, failed to fetch. Try again!");
      setFunDisplay("");
    }
    setFunLoading(false);
  };

  // On panel mount, load a quote by default
  React.useEffect(() => {
    fetchFunContent("quote");
    // eslint-disable-next-line
  }, []);

  // When funMode changes, load the appropriate content
  React.useEffect(() => {
    if (hasLoaded) fetchFunContent(funMode);
    // eslint-disable-next-line
  }, [funMode]);

  // --- UI Render ---
  return (
    <section className="panel-section interaction-panel">
      <div className="section-label">Interactive Zone</div>
      <h3>Interaction Panel</h3>

      {/* Wikipedia lookup feature */}
      <div
        style={{
          border: "2.5px solid #cde7fc",
          background: "#f2f7fa",
          borderRadius: 12,
          padding: "15px 17px 16px 17px",
          marginBottom: 18,
          marginTop: 1
        }}
      >
        <div style={{ fontWeight: 600, color: "#357de1", marginBottom: 7 }}>
          Wikipedia Topic Summary
        </div>
        <form
          onSubmit={handleWikiLookup}
          style={{
            display: "flex",
            gap: 7,
            marginBottom: "0.55rem",
            alignItems: "center",
          }}
          aria-label="Wikipedia Topic Lookup"
        >
          <input
            type="text"
            placeholder="Enter a topic (e.g. Photosynthesis)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            style={{
              flex: 1,
              padding: "9px 11px",
              fontSize: "1rem",
              borderRadius: 6,
              border: "1.3px solid var(--border-color)",
              minWidth: 0,
              background: "#fff"
            }}
            disabled={wikiLoading}
            aria-label="Wikipedia topic input"
          />
          <button
            className="btn"
            style={{ minWidth: 82 }}
            type="submit"
            disabled={!topic.trim() || wikiLoading}
          >
            {wikiLoading ? "Loading..." : "Lookup"}
          </button>
        </form>

        <div style={{ minHeight: 52 }}>
          {wikiLoading && (
            <div className="placeholder-visual" style={{ minHeight: 40, color: "#357de1" }}>
              Looking up <strong>{submittedTopic}</strong>...
            </div>
          )}
          {!wikiLoading && wikiError && (
            <div
              style={{
                background: "#fff2f0",
                color: "#b23b3b",
                border: "1.5px solid #ffd2cc",
                borderRadius: 7,
                padding: "9px 13px",
                marginBottom: 2,
              }}
            >
              {wikiError}
            </div>
          )}
          {!wikiLoading && !wikiError && summary && (
            <div
              style={{
                background: "#f8fafd",
                border: "1.4px solid #bee0fa",
                color: "#2e375b",
                fontSize: "1.01rem",
                borderRadius: 7,
                padding: "11px 14px",
                minHeight: 37,
                fontStyle: "italic",
                marginBottom: 1,
              }}
            >
              <span style={{ fontWeight: 600, color: "#4682e6" }}>
                {submittedTopic}:
              </span>{" "}
              {summary}
            </div>
          )}
          {!wikiLoading && !wikiError && !summary && (
            <div className="placeholder-visual" style={{ minHeight: 40 }}>
              Enter any academic topic to get a Wikipedia summary.
            </div>
          )}
        </div>
      </div>

      {/* Motivation/Joke zone */}
      <div
        style={{
          background: "#f5fcfc",
          border: "2.5px solid #c3ecd6",
          borderRadius: 13,
          padding: "15px 18px 15px 18px",
          marginBottom: "8px",
          minHeight: "82px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 4,
        }}>
          <span style={{
            fontWeight: 700,
            color: funMode === "quote" ? "#2599be" : "#d68500",
            fontSize: "1.05em"
          }}>
            {funMode === "quote" ? "Motivational Quote" : "Joke Time"}
          </span>
          <span style={{
            marginLeft: 10,
            fontSize: "1.2em"
          }}>
            {funMode === "quote" ? "💡" : "😂"}
          </span>
        </div>
        {/* Toggle group */}
        <div style={{
          display: "flex",
          gap: 6,
          marginBottom: 2,
          alignItems: "center"
        }}>
          <button
            className="btn"
            style={{
              background: funMode === "quote" ? "#4A90E2" : "#d6e9fa",
              color: funMode === "quote" ? "#fff" : "#1A1A1A",
              minWidth: 80,
              fontWeight: funMode === "quote" ? 600 : 400
            }}
            aria-label="Show motivational quote"
            onClick={() => setFunMode("quote")}
            disabled={funMode === "quote" || funLoading}
          >
            Quote
          </button>
          <button
            className="btn"
            style={{
              background: funMode === "joke" ? "#F5A623" : "#f7eddb",
              color: funMode === "joke" ? "#fff" : "#1A1A1A",
              minWidth: 80,
              fontWeight: funMode === "joke" ? 600 : 400
            }}
            aria-label="Show a joke"
            onClick={() => setFunMode("joke")}
            disabled={funMode === "joke" || funLoading}
          >
            Joke
          </button>
          <button
            className="btn"
            type="button"
            style={{
              marginLeft: "auto",
              minWidth: 80,
              background: "#e6faf8",
              color: "#2599be",
              fontWeight: 550,
              fontSize: "0.97em",
              border: "1px solid #bee0fa"
            }}
            aria-label="Reload random quote or joke"
            onClick={() => fetchFunContent(funMode)}
            disabled={funLoading}
          >
            {funLoading ? "Loading..." : "New Random"}
          </button>
        </div>
        {/* Fun content or error message */}
        <div style={{
          minHeight: 30,
          padding: "9px 10px",
          background: funMode === "quote" ? "#eaf7ff" : "#fffbe9",
          color: funMode === "quote" ? "#357de1" : "#b68b16",
          border: "1.5px solid " + (funMode === "quote" ? "#b7ddf7" : "#f7d797"),
          borderRadius: 8,
          fontSize: "1.09em",
          fontWeight: 500,
          fontStyle: funMode === "quote" ? "italic" : "normal",
          transition: "all 0.2s"
        }}>
          {funLoading && <span>Fetching something fun...</span>}
          {!funLoading && funError && (
            <span style={{ color: "#c52c0a", fontWeight: 600 }}>
              {funError}
            </span>
          )}
          {!funLoading && !funError && funDisplay && (
            <span>
              {funDisplay}
            </span>
          )}
          {!funLoading && !funError && !funDisplay && (
            <span style={{ opacity: 0.74 }}>
              {funMode === "quote" ? "No quote available." : "No joke available."}
            </span>
          )}
        </div>
      </div>

      {/* (legacy placeholder visual) */}
      <div className="placeholder-visual">
        Interact, explore, and have a little fun!
        <br />
        <span style={{ fontSize: "0.93em", color: "#54adc2" }}>
          Looking for interactive science tools? Try the Visualization Panel's PhET simulations!
        </span>
      </div>
    </section>
  );
}
