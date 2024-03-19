import { useState, useEffect } from 'react';

export default function useCountDown(intialValue: number | null = null) {
  const [countDown, setCountDown] = useState<number | null>(null);
  const [seconds, setSeconds] = useState<number | null>(intialValue);

  useEffect(() => {
    if (seconds === null) {
      setCountDown(null);
      return;
    }

    const unsubscribe = setInterval(() => {
      setCountDown((prev) => {
        if (prev === null) return seconds;
        if (prev === 0) return null;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(unsubscribe);
  }, [seconds]);

  useEffect(() => {
    if (countDown === null && seconds === null) {
      return;
    }
    if (countDown === 0) {
      setSeconds(null);
    }
  }, [countDown, seconds]);

  return [countDown, setSeconds] as const;
}
