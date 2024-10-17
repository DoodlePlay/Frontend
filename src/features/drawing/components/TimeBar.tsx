import { useEffect, useState } from 'react';

interface TimerBarProps {
  duration: number;
  onComplete: () => void;
  isTimeCut: boolean;
}

const MIN_DURATION = 1; // 최소 지속 시간 1초

const TimerBar: React.FC<TimerBarProps> = ({
  duration,
  onComplete,
  isTimeCut,
}) => {
  const [remainingDuration, setRemainingDuration] = useState(duration);
  const [animationDuration, setAnimationDuration] = useState(duration);

  useEffect(() => {
    if (isTimeCut) {
      const halfRemainingTime = Math.max(remainingDuration / 2, MIN_DURATION);
      setRemainingDuration(halfRemainingTime);
      setAnimationDuration(halfRemainingTime);

      const timer = setTimeout(() => {
        onComplete();
      }, halfRemainingTime * 1000);

      return () => clearTimeout(timer);
    } else {
      setRemainingDuration(duration);
      setAnimationDuration(duration);

      const timer = setTimeout(() => {
        onComplete();
      }, duration * 1000);

      return () => clearTimeout(timer);
    }
  }, [isTimeCut, duration, onComplete]);

  return (
    <div className="flex items-center gap-x-[15px]">
      <div className="ml-[15px]">
        <img
          src="/images/drawing/hourglass.svg"
          alt="hourglass"
          draggable={false}
          style={{
            width: '30px',
            height: '30px',
          }}
        />
      </div>
      <div className="w-full bg-disabled h-3 rounded-full overflow-hidden relative">
        <div
          className={`absolute top-0 left-0 h-full ${
            isTimeCut ? 'bg-fuschia' : 'bg-secondary-default'
          }`}
          style={{
            width: '100%',
            animation: `shrink ${animationDuration}s linear forwards`,
          }}
        />
      </div>
      <span>{remainingDuration}</span>
      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default TimerBar;
