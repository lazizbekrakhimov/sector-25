import React, { useEffect, useState } from "react";

interface LoadingProps {
  color?: string;
  size?: number;
  speed?: number;
}

const Loading: React.FC<LoadingProps> = ({ color = "", size = 16, speed = 500 }) => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, speed);
    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div
      className="flex items-center justify-center font-mono uppercase tracking-[0.2em]"
      style={{ color }}
    >
      <span
        className="inline-block w-4 h-4 border-2 border-t-transparent border-current rounded-full animate-spin mr-2"
        style={{ width: size, height: size }}
      ></span>
      <span>
        Loading{Array(dots).fill(".").join("")}{" "}
      </span>
    </div>
  );
};

export default Loading;
