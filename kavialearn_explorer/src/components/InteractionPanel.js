import React, { useState } from "react";
import useWikipedia from "../hooks/useWikipedia";

// PUBLIC_INTERFACE
export default function InteractionPanel() {
  // Wikipedia input state
  const [topic, setTopic] = useState("");
  const [submittedTopic, setSubmittedTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // The hook always runs for the latest submittedTopic - not on every keystroke
  const { summary } = useWikipedia(submittedTopic);

  // Handles topic lookup when form is submitted
  const handleWikiLookup = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setError("");
    setLoading(true);
    // Simulate async load, even if hook is sync (stub)
    setTimeout(() => {
      if (!summary || summary.toLowerCase().includes("not found")) {
        setError("No summary found for this topic.");
        setLoading(false);
        setSubmittedTopic(topic.trim());
      } else {
        setSubmittedTopic(topic.trim());
        setError("");
        setLoading(false);
      }
    }, 380); // short delay for user feedback
  };

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
            disabled={loading}
            aria-label="Wikipedia topic input"
          />
          <button
            className="btn"
            style={{ minWidth: 82 }}
            type="submit"
            disabled={!topic.trim() || loading}
          >
            {loading ? "Loading..." : "Lookup"}
          </button>
        </form>

        <div style={{ minHeight: 52 }}>
          {loading && (
            <div className="placeholder-visual" style={{ minHeight: 40, color: "#357de1" }}>
              Looking up <strong>{submittedTopic}</strong>...
            </div>
          )}
          {!loading && error && (
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
              {error}
            </div>
          )}
          {!loading && !error && summary && (
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
          {!loading && !error && !summary && (
            <div className="placeholder-visual" style={{ minHeight: 40 }}>
              Enter any academic topic to get a Wikipedia summary.
            </div>
          )}
        </div>
      </div>

      <div className="placeholder-visual">
        {/* Quotes, jokes components will be integrated here */}
        Interact, explore, and have a little fun! 
        <br />
        <span style={{ fontSize: "0.93em", color: "#54adc2" }}>Looking for interactive science tools? Try the Visualization Panel's PhET simulations!</span>
      </div>
    </section>
  );
}
