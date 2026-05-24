export const formatDuration = (seconds: number | null | undefined): string => {
  if (seconds === undefined || seconds === null || seconds < 0) {
    return "--:--";
  }

  const totalSeconds = Math.round(seconds);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;

  return `${mins}:${secs.toString().padStart(2, "0")}`;
};
