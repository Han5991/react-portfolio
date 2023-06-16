export const secondsToHhMmSs = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const hh = hours < 10 ? `0${hours}` : hours;
  const mm = minutes < 10 ? `0${minutes}` : minutes;
  const ss = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  return `${hh}:${mm}:${ss}`;
};
