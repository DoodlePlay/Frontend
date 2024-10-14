import { motion } from 'framer-motion';

const BombEffect = () => {
  return (
    <div className="absolute flex items-center justify-center w-full h-full">
      <motion.img
        src="/images/drawing/items/effects/explosion_01.svg"
        alt="explosion"
        className="absolute left-0 top-0 bottom-0 right-0 m-auto z-20"
        initial={{ x: 0 }}
        animate={{ x: [-5, 5, -5, 5, 0] }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
        draggable={false}
      />
      <motion.img
        src="/images/drawing/items/effects/explosion_02.svg"
        alt="explosion"
        className="absolute left-0 top-0 bottom-0 right-0 m-auto z-10"
        initial={{ x: 0 }}
        animate={{ x: [-5, 5, -5, 5, 0] }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
        draggable={false}
      />
    </div>
  );
};

export default BombEffect;