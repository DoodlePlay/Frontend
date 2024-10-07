'use client';

import { useState } from 'react';

import Button from '../../../components/Button/Button';
import CreateRoomModal from './CreateRoomModal';

const CreateRoomButton: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const onOpenModal = () => {
    setModalOpen(true);
  };

  const onCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Button
        text="Create"
        color="primary"
        onClick={onOpenModal}
        className="h-[60px]"
      />
      <CreateRoomModal isOpen={isModalOpen} onClose={onCloseModal} />
    </>
  );
};

export default CreateRoomButton;
