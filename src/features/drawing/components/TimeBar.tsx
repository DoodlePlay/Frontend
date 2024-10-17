import { useEffect, useState } from 'react';

interface TimerBarProps {
  duration: number;
  onComplete: () => void;
  isTimeCut: boolean;
}

const MIN_DURATION = 1;

const TimerBar: React.FC<TimerBarProps> = ({
  duration,
  onComplete,
  isTimeCut,
}) => {
  const [remainingDuration, setRemainingDuration] = useState(duration);
  const [isCutActive, setIsCutActive] = useState(isTimeCut);

  useEffect(() => {
    // Time-Cutter 사용 시
    if (isTimeCut && !isCutActive) {
      const newDuration = Math.max(remainingDuration / 2, MIN_DURATION);
      setRemainingDuration(newDuration);
      setIsCutActive(true);

      const timer = setTimeout(() => {
        onComplete();
      }, newDuration * 1000);

      return () => clearTimeout(timer);
    }

    // Time-Cutter가 트리거되지 않은 기본 타이머
    const timer = setTimeout(() => {
      onComplete();
    }, remainingDuration * 1000);

    return () => clearTimeout(timer);
  }, [isTimeCut, onComplete, remainingDuration]);

  // TODO
  // TimeBar를 현재 시간 부터 5분으로 아이템을 사용하면 다른 부분에서 시간이 계속 바뀌면서 다른 버튼에도 영향을 가는 것으로 추측
  // 현재 시간이 아닌 게임이 진행 시작 시간을 기준으로 작업하는게 좋아 보임.

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
            animation: `shrink ${remainingDuration}s linear forwards`,
          }}
        />
      </div>
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
