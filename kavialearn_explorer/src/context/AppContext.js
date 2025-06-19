import React, { createContext, useContext, useState } from "react";

// PUBLIC_INTERFACE
export const AppContext = createContext();

/**
 * PUBLIC_INTERFACE
 * AppProvider supplies global context and state for the explorer app.
 *
 * Usage: Wrap your component tree inside <AppProvider>.
 */
export function AppProvider({ children }) {
  // Example: future addition of theme, user, or session state
  const [theme, setTheme] = useState("dark");

  // Placeholder for shared app state
  const value = {
    theme,
    setTheme,
    // Add panel states and shared data as needed
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAppContext() {
  return useContext(AppContext);
}
