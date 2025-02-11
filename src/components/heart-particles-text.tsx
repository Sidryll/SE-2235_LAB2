import React, { useEffect, useRef, useState } from "react";
import "./heart-particles-text.css";

interface Heart {
  id: number;
  style: React.CSSProperties;
}

const HeartParticlesText: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hearts, setHearts] = useState<Heart[]>([]);

  const randomNum = (m: number, n: number) => {
    return Math.floor(Math.random() * (n - m + 1)) + m;
  };

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      const heartCount = Math.floor((width / 50) * 5);
      const newHearts: Heart[] = [];

      for (let i = 0; i < heartCount; i++) {
        const heartSize = randomNum(60, 120) / 10;
        newHearts.push({
          id: i,
          style: {
            top: `${randomNum(40, 80)}%`,
            left: `${randomNum(0, 100)}%`,
            width: `${heartSize}px`,
            height: `${heartSize}px`,
            animationDelay: `-${randomNum(0, 3)}s`,
            animationDuration: `${randomNum(2, 5)}s`,
          },
        });
      }
      setHearts(newHearts);
    }
  }, []);

  return (
    <div className="container">
      <div ref={containerRef} className="effect-text">
        <span className="main-text">Will you be my valentine?</span>
        {hearts.map((heart) => (
          <span key={heart.id} className="tiny-heart" style={heart.style} />
        ))}
      </div>
    </div>
  );
};

export default HeartParticlesText;
