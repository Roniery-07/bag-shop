import { useEffect, useState } from 'react';

export const useDebounce = (timeout: number, value: string) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);

    return () => {
      clearTimeout(handler);
    };
  }, [timeout, value]);

  return debouncedValue;
};
