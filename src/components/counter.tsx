import React, { useEffect, useState } from "react";

interface CounterProps {
  value: number;
  duration?: number;
}

const Counter: React.FC<CounterProps> = ({ value, duration = 1000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const incrementTime = duration / end;

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{value === 0 ? 0 : count}</span>;
};

export default Counter;
