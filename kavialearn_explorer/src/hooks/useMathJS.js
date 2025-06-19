/**
 * PUBLIC_INTERFACE
 * Hook for Math.js math computations and plotting (stub)
 */
export default function useMathJS(equation = "") {
  // TODO: Wire up math.js or similar lib for actual evaluation/plot data
  const evaluate = (expr) =>
    `Stub result for '${expr}'`;
  const plotData = equation
    ? [{ x: 0, y: 0 }, { x: 1, y: 1 }]
    : [];
  return { evaluate, plotData };
}
