export function formatTime(seconds: number): string {
  const totalSeconds = Math.floor(seconds);

  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const twoDigits = (num: number) => num.toString().padStart(2, "0");

  if (hrs > 0) {
    return `${twoDigits(hrs)}:${twoDigits(mins)}:${twoDigits(secs)}`;
  } else {
    return `${twoDigits(mins)}:${twoDigits(secs)}`;
  }
}
