'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Button from '../../../components/Button/Button';
import Modal from '../../../components/Modal/Modal';
import useSocketStore from '../../socket/socketStore';
import { updateGameStatus } from '../../lobby/api/gameRoomsApi';

const GameControlButtons = () => {
  const router = useRouter();
  const { disconnectSocket, socket, roomId } = useSocketStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onStartGame = async () => {
    if (socket && roomId) {
      socket.emit('startGame', roomId);
      await updateGameStatus(roomId, 'playing');
    }
  };

  const onExitGame = () => {
    setIsModalOpen(true); // 모달을 엽니다.
  };

  const confirmExit = () => {
    disconnectSocket();
    router.replace('/room'); // /room 페이지로 이동하면서 히스토리 스택을 대체합니다.
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달을 닫습니다.
  };

  //TODO: 방장(host)만 게임이 진행되기 전에만 start 버튼 보이도록

  return (
    <div className="w-full flex gap-x-[30px]">
      <Button
        text="START"
        color="primary"
        onClick={onStartGame}
        className="h-[70px]"
      />
      <Button
        text="EXIT"
        color="secondary"
        onClick={onExitGame}
        className="h-[70px]"
      />

      {/* 모달 컴포넌트 */}
      <Modal isOpen={isModalOpen} title="나가기" onClose={closeModal}>
        <p>정말로 나가시겠습니까?</p>
        <div className="flex justify-center gap-4 mt-4">
          <Button text="Yes" color="primary" onClick={confirmExit} />
          <Button text="No" color="neutral" onClick={closeModal} />
        </div>
      </Modal>
    </div>
  );
};

export default GameControlButtons;
