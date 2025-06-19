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
      <div className="app">
        <NavigationHeader />
        <main className="main-layout">
          <div className="visualization-panel">
            <VisualizationPanel />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18 }}>
            <div className="data-panel">
              <DataPanel />
            </div>
            <div className="ai-panel">
              <AIInsightsPanel />
            </div>
          </div>
          <div className="interaction-panel">
            <InteractionPanel />
          </div>
        </main>
      </div>
    </AppProvider>
  );
}
