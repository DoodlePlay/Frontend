import React from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  const onClickBackground = (e: React.MouseEvent) => {
    onClose();
  };

  const onClickModal = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/[.13] z-10"
      onClick={onClickBackground}
    >
      <div
        className="flex flex-col gap-5 bg-white w-[500px] p-[30px] rounded-2xl border-[3px] border-black drop-shadow-modal"
        onClick={onClickModal}
      >
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <button onClick={onClose} aria-label="Close modal">
            <img
              src="/images/closeModal.svg"
              alt="close icon"
              draggable="false"
            />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
