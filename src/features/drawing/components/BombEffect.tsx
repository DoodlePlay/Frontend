import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BombEffect: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="absolute flex items-center justify-center w-full h-full">
      <motion.img
        src="/images/drawing/items/effects/explosion01.svg"
        alt="explosion"
        className="absolute left-0 top-0 bottom-0 right-0 m-auto z-20"
        initial={{ scale: 0.1 }}
        animate={{ scale: 1.8 }}
        transition={{
          type: 'spring',
          stiffness: 30,
        }}
        draggable={false}
      />
      <motion.img
        src="/images/drawing/items/effects/explosion02.svg"
        alt="explosion"
        className="absolute left-0 top-0 bottom-0 right-0 m-auto z-10"
        initial={{ scale: 0.1 }}
        animate={{ scale: 1.8 }}
        transition={{
          type: 'spring',
          stiffness: 30,
        }}
        draggable={false}
      />
    </div>
  );
};

export default BombEffect;
