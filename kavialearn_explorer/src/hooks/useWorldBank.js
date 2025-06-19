/**
 * PUBLIC_INTERFACE
 * Hook for World Bank data fetch (stub).
 */
export default function useWorldBank(code = "SP.POP.TOTL", country = "USA") {
  // TODO: Real data fetch
  const worldBankData = [{ year: 2020, value: 331002647 }];
  return { worldBankData };
}
