/**
 * PUBLIC_INTERFACE
 * Hook for providing PhET simulation URL (stub).
 */
export default function usePhET(simName = "gravity") {
  const simUrl =
    "https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_en.html";
  // TODO: Return requested sim url
  return { simUrl };
}
