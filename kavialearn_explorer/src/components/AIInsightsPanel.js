import React, { useState } from "react";
import useKaviaAI from "../hooks/useKaviaAI";

// PUBLIC_INTERFACE
export default function AIInsightsPanel() {
  const { aiResponse, askAI } = useKaviaAI();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    await askAI(input);
    setHistory((prev) => [
      ...prev,
      { question: input, answer: null }, // Will fill answer after async
    ]);
    setInput("");
    setLoading(false);
  };

  // Update the latest history answer when aiResponse changes (only if loading just finished)
  React.useEffect(() => {
    if (!loading && aiResponse && history.length > 0 && !history[history.length - 1].answer) {
      setHistory((prev) => [
        ...prev.slice(0, -1),
        { ...prev[prev.length - 1], answer: aiResponse },
      ]);
    }
    // eslint-disable-next-line
  }, [aiResponse, loading]);

  return (
    <section className="panel-section ai-panel">
      <div className="section-label">Kavia AI</div>
      <h3>AI Insights</h3>

      <form
        style={{
          display: "flex",
          gap: 10,
          marginBottom: "0.5rem",
          alignItems: "center"
        }}
        onSubmit={handleSubmit}
        aria-label="Ask Kavia AI"
      >
        <input
          type="text"
          value={input}
          placeholder="Ask Kavia AI anything about your topic..."
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid var(--border-color)",
            fontSize: "1rem",
            minWidth: 0,
            background: "#fff8ee"
          }}
          aria-label="AI question input"
          disabled={loading}
        />
        <button
          className="btn"
          type="submit"
          disabled={!input.trim() || loading}
          style={{ minWidth: 90 }}
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>

      <div style={{maxHeight: 210, overflowY: "auto"}}>
        {history.length === 0 && (
          <div className="placeholder-visual">
            {/* No questions asked yet */}
            Ask Kavia AI and see intelligent analysis here.
          </div>
        )}

        {history.map((entry, idx) => (
          <div
            key={idx}
            style={{
              background: "#fffbe9",
              border: "1px solid var(--accent, #f5a62322)",
              borderRadius: "8px",
              marginBottom: "11px",
              padding: "11px 14px",
              boxShadow: "0 1px 4px 0 #ffebbc0d",
              fontSize: "1rem",
            }}
          >
            <div style={{ fontWeight: 600, color: "var(--accent)", marginBottom: 3 }}>
              You: <span style={{ color: "#ce8d07" }}>{entry.question}</span>
            </div>
            {entry.answer ? (
              <div style={{ color: "#603d00", marginTop: 4 }}>
                <span style={{
                  display: "inline-block",
                  marginRight: 6,
                  fontWeight: 500
                }}>Kavia AI:</span>
                <span style={{
                  fontStyle: "normal",
                }}>{entry.answer}</span>
              </div>
            ) : (
              <div style={{ color: "#ce8107", fontStyle: "italic" }}>Kavia AI is generating an answer...</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
