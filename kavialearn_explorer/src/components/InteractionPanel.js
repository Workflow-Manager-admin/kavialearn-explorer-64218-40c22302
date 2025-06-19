import React from "react";

// PUBLIC_INTERFACE
export default function InteractionPanel() {
  return (
    <section style={{
      background: "rgba(80,227,194,0.06)",
      borderRadius: 8,
      padding: 17,
      minHeight: 180
    }}>
      <h3 style={{ color: "var(--secondary, #50E3C2)", margin: 0 }}>Interaction Panel</h3>
      <div style={{ color: "var(--text-secondary)" }}>
        {/* PhET, quotes, jokes components will be integrated here */}
        Interact, explore, and have a little fun!
      </div>
    </section>
  );
}
