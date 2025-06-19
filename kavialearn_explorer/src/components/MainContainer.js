import React from "react";
import { AppProvider } from "../context/AppContext";
import NavigationHeader from "./NavigationHeader";
import VisualizationPanel from "./VisualizationPanel";
import DataPanel from "./DataPanel";
import AIInsightsPanel from "./AIInsightsPanel";
import InteractionPanel from "./InteractionPanel";
import "../App.css";

// PUBLIC_INTERFACE
export default function MainContainer() {
  return (
    <AppProvider>
      <div className="app" style={{ background: "var(--base-dark)", minHeight: "100vh" }}>
        <NavigationHeader />

        <main style={{ marginTop: 80, display: "flex", flexDirection: "row", gap: 24, justifyContent: "center" }}>
          <div style={{ flex: 2, minWidth: 330, maxWidth: 440 }}>
            <VisualizationPanel />
          </div>
          <div style={{ flex: 1.5, minWidth: 270 }}>
            <DataPanel />
            <AIInsightsPanel />
          </div>
          <div style={{ flex: 1, minWidth: 220, maxWidth: 280 }}>
            <InteractionPanel />
          </div>
        </main>
      </div>
    </AppProvider>
  );
}
