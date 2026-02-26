import React, { useEffect, useState } from "react";

interface LoadingProps {
  size?: number;
  speed?: number;
}

const Loading: React.FC<LoadingProps> = ({ size = 18, speed = 250 }) => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, speed);
    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div className="flex items-center justify-center font-mono uppercase tracking-[0.2em]">
      <span
        className="inline-block border-2 border-t-transparent border-current rounded-full animate-spin mr-3"
        style={{ width: size, height: size }}
      />
      <span>Loading</span>
      <span className="inline-block w-6 text-left">
        {Array(dots).fill(".").join("")}
      </span>
    </div>
  );
};

export default Loading;