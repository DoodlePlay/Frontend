'use client';

import { useEffect, useState } from 'react';

import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import ChatBox from '../../features/chat/components/ChatBox';
import Drawing from '../../features/drawing/components/Drawing';
import GameControlButtons from '../../features/drawing/components/GameControlButtons';
import ItemBox from '../../features/drawing/components/ItemBox';
import VideoChat from '../../features/videoChat/components/VideoChat';
import useSocketStore from '../../features/socket/socketStore';
import useItemStore from '../../features/drawing/store/useItemStore';

const GamePage = () => {
  const { gameState } = useSocketStore();
  const { resetItemUsageState } = useItemStore();
  const [isGameStatusModalOpen, setGameStatusModalOpen] = useState(false);

  const onCloseGameStatusModal = () => {
    setGameStatusModalOpen(false);
  };

  useEffect(() => {
    if (isGameStatusModalOpen) {
      const timer = setTimeout(() => {
        onCloseGameStatusModal();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isGameStatusModalOpen]);

  useEffect(() => {
    resetItemUsageState();
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex items-center justify-center min-h-dvh overflow-hidden scrollbar-hide">
        <div className="flex w-full max-w-[1240px] gap-[40px]">
          <div className="flex flex-col left w-full gap-y-[20px]">
            <Drawing isGameStatusModalOpen={isGameStatusModalOpen} />
            <ChatBox />
          </div>
          <div className="flex flex-col right w-full max-w-[420px] gap-y-[20px]">
            <div className="w-full rounded-[10px] mb-[10px]">
              <VideoChat />
            </div>
            <div className="flex flex-col w-full gap-y-[20px] mb-[2px]">
              {gameState?.isItemsEnabled ? (
                <ItemBox />
              ) : (
                <div className="h-[150px]"></div>
              )}
              <GameControlButtons
                setGameStatusModalOpen={setGameStatusModalOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};
export default GamePage;
