import { useEffect, useState } from 'react';

interface TimerBarProps {
  duration: number; // duration 추후 설정 예정
  onComplete: () => void;
}

const TimerBar: React.FC<TimerBarProps> = ({ duration, onComplete }) => {
  const [progressWidth, setProgressWidth] = useState('100%');
  const [animationDuration, setAnimationDuration] = useState(duration); // 애니메이션 지속 시간 상태 추가

  useEffect(() => {
    setProgressWidth('100%'); // duration이 변경될 때마다 progressWidth를 초기화

    // 새 duration에 맞춰 애니메이션 지속 시간 업데이트
    setTimeout(() => {
      setProgressWidth('0%');
    }, 50); // 살짝 지연 후 시작

    setAnimationDuration(duration); // 새로운 duration 반영

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
          style={{
            animation: `spin ${animationDuration / 2}s linear infinite`,
          }}
        />
      </div>
      <div className="w-full bg-disabled h-3 rounded-full overflow-hidden">
        <div
          className="bg-secondary-default h-full transition-all ease-linear"
          style={{
            width: progressWidth,
            transitionDuration: `${animationDuration}s`, // 애니메이션 지속 시간 적용
          }}
        ></div>
      </div>
    </div>
  );
};

export default TimerBar;
