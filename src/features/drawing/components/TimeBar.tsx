'use client';

import { useEffect, useState } from 'react';

interface TimerBarProps {
  duration: number; // duration 추후 설정 예정
  onComplete: () => void;
}

const TimerBar: React.FC<TimerBarProps> = ({ duration, onComplete }) => {
  const [progressWidth, setProgressWidth] = useState('100%');

  useEffect(() => {
    // 타이머가 시작되면 자연스럽게 100%에서 0%로 너비가 줄어들도록 설정합니다.
    setTimeout(() => {
      setProgressWidth('0%');
    }, 50); // 살짝 지연 후 시작

    // duration이 끝나면 onComplete 호출
    const timer = setTimeout(() => {
      onComplete();
    }, duration * 1000);

    // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <div className="flex items-center gap-x-[15px]">
      <div className="ml-[15px]">
        <img
          src="/images/drawing/hourglass.svg"
          alt="hourglass"
          draggable={false}
          className="animate-spin"
          style={{ animation: `spin ${duration / 2}s linear infinite` }}
        />
      </div>
      <div className="w-full bg-disabled h-3 rounded-full overflow-hidden">
        <div
          className="bg-secondary-default h-full transition-all ease-linear"
          style={{
            width: progressWidth,
            transitionDuration: `${duration}s`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default TimerBar;
