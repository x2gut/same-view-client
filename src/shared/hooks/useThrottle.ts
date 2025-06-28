export const useThrottle = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number
) => {
  let lastCall = 0;
  return function (...args: Parameters<T>) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  };
};
