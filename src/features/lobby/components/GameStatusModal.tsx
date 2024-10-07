import { motion, AnimatePresence } from 'framer-motion';

interface GameStatusModalProps {
  isOpen: boolean;
  errorType: 'full' | 'playing' | null;
}

const GameStatusModal: React.FC<GameStatusModalProps> = ({
  isOpen,
  errorType,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="gameStatusModal"
          className="fixed top-[80px] inset-x-0 mx-auto bg-white p-[30px] rounded-[20px] w-[500px] border-[3px] border-black shadow-board z-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              type: 'spring',
              stiffness: 1000,
              damping: 20,
              duration: 0.8,
            },
          }}
          exit={{
            opacity: 0,
            y: -20,
            transition: { duration: 0.3, ease: 'easeInOut' },
          }}
        >
          {errorType === 'playing' && (
            <>
              <h2 className="text-2xl font-bold text-fuschia">
                Game in Progress 😢
              </h2>
              <p className="mt-[10px]">
                게임이 이미 진행 중입니다. 다른 방을 선택해주세요.
              </p>
            </>
          )}
          {errorType === 'full' && (
            <>
              <h2 className="text-2xl font-bold text-fuschia">Room Full 😢</h2>
              <p className="mt-[10px]">
                방 정원이 다 찼습니다. 다른 방을 선택해주세요.
              </p>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameStatusModal;
