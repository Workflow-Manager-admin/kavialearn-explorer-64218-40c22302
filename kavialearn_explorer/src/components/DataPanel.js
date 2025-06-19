import React from "react";

// PUBLIC_INTERFACE
export default function DataPanel() {
  return (
    <section style={{
      background: "rgba(0,0,0,0.13)",
      borderRadius: 8,
      padding: 18,
      marginBottom: 20,
      minHeight: 180
    }}>
      <h3 style={{ color: "var(--base-light)", margin: 0 }}>Data Panel</h3>
      <div style={{ color: "var(--text-secondary)" }}>
        {/* WorldBank, Weather API data and charts will appear here */}
        Data-driven insights coming soon.
      </div>
    </section>
  );
}
