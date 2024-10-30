import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TimerBarProps {
  deadline: number;
  isTimeCut: boolean;
}

const TimerBar: React.FC<TimerBarProps> = ({ deadline, isTimeCut }) => {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const calculateDuration = () => {
      const currentTime = Date.now();
      const remainingTime = Math.max(deadline - currentTime, 0);

      setDuration(remainingTime / 1000);
    };

    calculateDuration();
  }, [deadline]);

  return (
    <div className="flex items-center gap-x-[15px]">
      <div className="ml-[15px]">
        <motion.img
          src="/images/drawing/hourglass.svg"
          alt="hourglass"
          draggable={false}
          animate={{ rotate: 180 }}
          transition={{
            repeat: Infinity,
            ease: 'easeInOut',
            duration: 2,
          }}
          style={{
            width: '30px',
            height: '30px',
          }}
        />
      </div>
      <div className="w-full bg-disabled h-3 rounded-full overflow-hidden relative">
        <motion.div
          key={duration}
          className={`absolute top-0 left-0 h-full ${
            isTimeCut ? 'bg-fuschia' : 'bg-secondary-default'
          }`}
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration, ease: 'linear' }}
        />
      </div>
    </div>
  );
};

export default TimerBar;
