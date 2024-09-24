'use client';
import { useState, useEffect } from 'react';

interface TimerBarProps {
  duration: number;
  onComplete: () => void;
}

const TimerBar: React.FC<TimerBarProps> = ({ duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      onComplete();
    }
  }, [timeLeft, onComplete]);

  const progress = (timeLeft / duration) * 100;

  return (
    <div className="flex items-center gap-x-[15px]">
      <div className="ml-1">
        <img
          src="/images/drawing/hourglass.svg"
          alt="hourglass"
          loading="lazy"
          style={{ animation: `spin ${duration}s linear infinite` }}
        />
      </div>
      <div className="w-full bg-disabled h-3 rounded-full overflow-hidden">
        <div
          className="bg-secondary-default h-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default TimerBar;
