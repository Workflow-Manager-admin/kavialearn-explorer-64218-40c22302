import React, { useState } from "react";
import useMathJS from "../hooks/useMathJS";

// PUBLIC_INTERFACE
/**
 * VisualizationPanel integrates interactive math expression input and plotting
 * via Math.js. Allows user to input math functions, computes with useMathJS,
 * and displays result and a stub plot. Handles loading, error, and clear states.
 */
export default function VisualizationPanel() {
  // UI state for input, computation, feedback
  const [input, setInput] = useState("");
  const [submittedExpr, setSubmittedExpr] = useState("");
  const [result, setResult] = useState(null);
  const [plotPts, setPlotPts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Consuming (stub/mock) useMathJS.
  const { evaluate, plotData } = useMathJS(submittedExpr);

  // Handler for math form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setHasSubmitted(true);
    setLoading(true);

    try {
      // Evaluate and plot via hook
      // In real hook, exceptions/errors would be caught; we simulate handling
      const computed = evaluate(input);
      setResult(computed);

      // Simulate getting plot data array
      setPlotPts(Array.isArray(plotData) ? plotData : []);
    } catch (err) {
      setError(
        "Could not compute value. Please check the math expression syntax."
      );
      setResult(null);
      setPlotPts([]);
    }

    setSubmittedExpr(input);
    setLoading(false);
  };

  // Reset form
  const handleClear = () => {
    setInput("");
    setResult(null);
    setPlotPts([]);
    setHasSubmitted(false);
    setSubmittedExpr("");
    setLoading(false);
    setError("");
  };

  // Controlled input updates
  const handleInput = (e) => {
    setInput(e.target.value);
    setError("");
  };

  // Simple plot rendering (placeholder for plot lib)
  const renderPlotStub = (data) => {
    if (!Array.isArray(data) || data.length === 0) return null;
    // Render a stub XY plot as SVG for demonstration
    const w = 220, h = 100, pad = 18;

    // Find bounds for normalization
    const xs = data.map(pt => pt.x);
    const ys = data.map(pt => pt.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    // Normalize data into SVG coords
    const toSvgCoords = (x, y) => [
      pad + ((x - minX) / (maxX - minX || 1)) * (w - 2 * pad),
      h - pad - ((y - minY) / (maxY - minY || 1)) * (h - 2 * pad)
    ];

    const pointsAttr = data.map(pt => toSvgCoords(pt.x, pt.y).join(",")).join(" ");

    return (
      <svg width={w} height={h} style={{ background: "#f8fcff", borderRadius: 9, border: "1px solid #dadeeb", marginTop: 16 }}>
        <polyline
          points={pointsAttr}
          fill="none"
          stroke="#4A90E2"
          strokeWidth="2"
        />
        <text x={pad} y={pad + 6} fontSize="10" fill="#586a8d">x</text>
        <text x={w - pad} y={h - pad} fontSize="10" fill="#586a8d" textAnchor="end">y</text>
      </svg>
    );
  };

  return (
    <section className="panel-section visualization-panel">
      <div className="section-label">Concept Visualization</div>
      <h2>Visualization Panel</h2>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 9,
          alignItems: "center",
          marginBottom: "1rem"
        }}
        aria-label="Math Expression Input"
      >
        <input
          type="text"
          value={input}
          onChange={handleInput}
          placeholder="Enter math expression, e.g. sin(x), 3*(2+7)"
          style={{
            flex: 1,
            padding: "11px 13px",
            borderRadius: "7px",
            border: "1.5px solid var(--border-color)",
            fontSize: "1.09rem",
            background: "#f1f8ff"
          }}
          aria-label="Math expression"
          disabled={loading}
          autoFocus
        />
        <button
          className="btn"
          style={{ minWidth: 90 }}
          type="submit"
          disabled={!input.trim() || loading}
        >
          {loading ? "Calculating..." : "Compute"}
        </button>
        <button
          className="btn"
          type="button"
          style={{ background: "#d6e9fa", color: "#1A1A1A", minWidth: 62 }}
          onClick={handleClear}
          disabled={loading && !hasSubmitted}
        >
          Clear
        </button>
      </form>

      {/* Feedback rendering */}
      {error && (
        <div
          style={{
            color: "#c52c0a",
            background: "#fff2f0",
            padding: "9px 14px",
            border: "1.5px solid #ffd2cc",
            borderRadius: "7px",
            marginBottom: 10
          }}
        >
          {error}
        </div>
      )}

      {/* Results and plot */}
      {hasSubmitted && !error && (
        <div>
          <div
            style={{
              background: "#f4fafd",
              border: "1.5px solid #cde7fc",
              borderRadius: "8px",
              padding: "13px 17px",
              marginBottom: 10,
              fontSize: "1.04rem"
            }}
          >
            <strong>Input:</strong> <span style={{ color: "#357de1" }}>{submittedExpr}</span>
            <br />
            <strong>Result:</strong>{" "}
            <span style={{ color: "#11754b" }}>
              {loading ? "Loading..." : result}
            </span>
          </div>
          <div>
            <div style={{ fontWeight: 500, color: "#5b6cc1", marginBottom: 7 }}>
              {/* Only show plot for single-variable expressions */}
              Plot (stub): {" "}
              <span style={{ color: "#156dea" }}>
                {Array.isArray(plotPts) && plotPts.length > 1
                  ? "See preview below"
                  : "Expression not plottable"}
              </span>
            </div>
            {Array.isArray(plotPts) && plotPts.length > 1 ? (
              renderPlotStub(plotPts)
            ) : (
              <div
                className="placeholder-visual"
                style={{ minHeight: 36, marginTop: 10, background: "#f8fcff" }}
              >
                Graph will appear for plottable expressions.
              </div>
            )}
          </div>
        </div>
      )}

      {!hasSubmitted && (
        <div className="placeholder-visual" style={{ minHeight: 65 }}>
          {/* NASA, Math.js, Weather, PhET Sim hooks/components will be plugged here */}
          Type a math function/expression to see instant results and a plot!
        </div>
      )}
    </section>
  );
}
