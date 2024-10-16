import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TimerBarProps {
  duration: number; // 총 duration 설정
  onComplete: () => void;
  isTimeCut: boolean; // Time-Cutter 아이템 사용 여부
}

const TimerBar: React.FC<TimerBarProps> = ({
  duration,
  onComplete,
  isTimeCut,
}) => {
  const [remainingDuration, setRemainingDuration] = useState(duration); // 남은 시간
  const [progressDuration, setProgressDuration] = useState(duration); // progress 애니메이션 시간

  useEffect(() => {
    setRemainingDuration(duration); // 타이머 초기화
    setProgressDuration(duration); // 애니메이션 시간 초기화

    const timer = setTimeout(() => {
      onComplete();
    }, duration * 1000);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  useEffect(() => {
    if (isTimeCut) {
      const halfTime = remainingDuration / 2;
      setRemainingDuration(halfTime); // 남은 시간의 절반으로 설정
      setProgressDuration(halfTime); // 애니메이션 시간도 절반으로 줄이기

      const timer = setTimeout(() => {
        onComplete();
      }, halfTime * 1000);

      return () => clearTimeout(timer);
    }
  }, [isTimeCut]);

  return (
    <div className="flex items-center gap-x-[15px]">
      <div className="ml-[15px]">
        <motion.img
          src="/images/drawing/hourglass.svg"
          alt="hourglass"
          draggable={false}
          animate={{ rotate: 360 }}
          transition={{
            duration: progressDuration / 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            width: '30px', // 아이콘 크기 조정
            height: '30px',
          }}
        />
      </div>
      <div className="w-full bg-disabled h-3 rounded-full overflow-hidden">
        <motion.div
          className={`${
            isTimeCut === true ? 'bg-fuschia' : 'bg-secondary-default'
          } h-full`}
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: progressDuration, ease: 'linear' }}
          key={progressDuration} // 변경 시 애니메이션 재시작
        />
      </div>
    </div>
  );
};

export default TimerBar;
