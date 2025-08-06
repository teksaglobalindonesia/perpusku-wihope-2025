'use client';
import { useState, useEffect } from 'react';

export const useDebaunce = <T>(value: T, delay?: number) => {
  const [debaunceVal, setDebaunceVal] = useState(value);

  useEffect(() => {
    setTimeout(() => {
      setDebaunceVal(value);
    }, delay ?? 500);
  }, [value, delay]);

  return debaunceVal;
};
