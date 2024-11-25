import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import playSound from '../../utils/helpers/playSound';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, children, onClose }) => {
  const onClickBackground = (e: React.MouseEvent) => {
    playSound('/sounds/modalCancel.wav', 0.2);
    onClose();
  };

  const onClickModal = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/[.13] z-40"
          onClick={onClickBackground}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="flex flex-col gap-5 bg-white w-[500px] p-[30px] rounded-2xl border-[3px] border-black drop-shadow-modal"
            onClick={onClickModal}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold">{title}</h2>
              <button
                onClick={() => {
                  playSound('/sounds/modalCancel.wav', 0.2);
                  onClose();
                }}
                aria-label="Close modal"
              >
                <img
                  src="/images/closeModal.svg"
                  alt="close icon"
                  draggable="false"
                />
              </button>
            </div>
            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
