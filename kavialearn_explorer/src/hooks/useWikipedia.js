/**
 * PUBLIC_INTERFACE
 * Hook to fetch a Wikipedia summary/article (stub).
 */
export default function useWikipedia(title = "Photosynthesis") {
  // TODO: implement summary fetch
  const summary = `Stub summary for ${title}`;
  return { summary };
}
