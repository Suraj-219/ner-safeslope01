import { useState, useEffect } from 'react';

export const useCountUp = (target, duration = 2000, startOnMount = true) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(startOnMount);

  useEffect(() => {
    if (!started) return;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);

  return { count, start: () => setStarted(true) };
};
