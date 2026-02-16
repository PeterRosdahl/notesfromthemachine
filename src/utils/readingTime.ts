export function getReadingTime(content: string, wordsPerMinute = 225): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return minutes === 1 ? '1 min read' : `${minutes} min read`;
}
