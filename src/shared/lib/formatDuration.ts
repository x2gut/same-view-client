export const formatDuration = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return seconds <= 1 ? "just now" : `${seconds}s ago`;
  } else if (minutes < 60) {
    return minutes === 1 ? "1m ago" : `${minutes}m ago`;
  } else if (hours < 24) {
    return hours === 1 ? "1h ago" : `${hours}h ago`;
  } else if (days < 30) {
    return days === 1 ? "1d ago" : `${days}d ago`;
  } else if (months < 12) {
    return months === 1 ? "1mo ago" : `${months}mo ago`;
  } else {
    return years === 1 ? "1y ago" : `${years}y ago`;
  }
};
