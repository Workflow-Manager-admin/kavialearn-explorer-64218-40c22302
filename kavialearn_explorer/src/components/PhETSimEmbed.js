import React from "react";
import usePhET from "../hooks/usePhET";

// PUBLIC_INTERFACE
/**
 * PhETSimEmbed embeds a selectable PhET simulation using an accessible iframe.
 * Users may choose a simulation to load.
 */
export default function PhETSimEmbed({ initialSim = "projectile-motion" }) {
  // Expand list as needed; just a few for demo
  const simList = [
    {
      key: "projectile-motion",
      label: "Projectile Motion",
      url: "https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_en.html",
    },
    {
      key: "gravity-and-orbits",
      label: "Gravity and Orbits",
      url: "https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_en.html",
    },
    {
      key: "states-of-matter",
      label: "States of Matter",
      url: "https://phet.colorado.edu/sims/html/states-of-matter/latest/states-of-matter_en.html",
    },
    {
      key: "energy-skate-park",
      label: "Energy Skate Park",
      url: "https://phet.colorado.edu/sims/html/energy-skate-park/latest/energy-skate-park_en.html",
    },
    // Add more as desired
  ];

  const defaultSim =
    simList.find((sim) => sim.key === initialSim) || simList[0];

  const [selected, setSelected] = React.useState(defaultSim);

  // Optionally, integrate with usePhET to dynamically fetch URLs by sim key
  // const { simUrl } = usePhET(selected.key);

  return (
    <section style={{
      background: "#f5fcfc",
      border: "1.5px solid #bce4e7",
      borderRadius: 14,
      padding: "19px 14px 14px 14px",
      marginBottom: 16,
      marginTop: 7,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }}>
      <div style={{
        fontWeight: 600,
        color: "#2599be",
        marginBottom: 6,
        fontSize: "1.05rem"
      }}>
        Interactive Science Simulation (PhET)
      </div>
      <label
        htmlFor="select-phet-sim"
        style={{
          fontWeight: 500,
          color: "#1078ac",
          fontSize: "0.97rem",
          marginBottom: 3
        }}
      >
        Choose a simulation:
      </label>
      <select
        id="select-phet-sim"
        value={selected.key}
        onChange={(e) => {
          const sim = simList.find((s) => s.key === e.target.value);
          if (sim) setSelected(sim);
        }}
        style={{
          width: "fit-content",
          fontSize: "1rem",
          padding: "6px 12px",
          borderRadius: 7,
          border: "1.5px solid #a0c8de",
          marginBottom: 10,
          background: "#fff"
        }}
        aria-label="Select PhET Simulation"
      >
        {simList.map((sim) => (
          <option key={sim.key} value={sim.key}>
            {sim.label}
          </option>
        ))}
      </select>
      <div
        style={{
          border: "1.5px solid #aad8eb",
          borderRadius: 10,
          overflow: "hidden",
          background: "#e7f8fb",
          marginBottom: 4
        }}
      >
        <iframe
          title={selected.label}
          src={selected.url}
          width="100%"
          height="325"
          style={{
            border: "none",
            minWidth: "240px",
            width: "100%",
            maxWidth: "100%",
            display: "block"
          }}
          sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-popups allow-forms"
          aria-label={selected.label}
        />
      </div>
      <div style={{ fontSize: "0.96rem", color: "#176985" }}>
        Simulation courtesy of <a href="https://phet.colorado.edu/" target="_blank" rel="noopener noreferrer" style={{ color: "#137fe6", textDecoration: "underline" }}>PhET Interactive Simulations</a>
      </div>
    </section>
  );
}
