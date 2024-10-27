'use client';
import { useEffect, useState } from 'react';
import useSocketStore from '../../socket/socketStore';
import PlayingVideoChat from './PlayingVideoChat';
import WaitingVideoChat from './WaitingVideoChat';

const VideoChat = () => {
  const { socket, gameState } = useSocketStore();
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    if (socket) {
      socket.on('gameStateUpdate', () => {
        setIsPlaying(true);
      });
      return () => {
        socket.off('gameStateUpdate');
      };
    }
  }, [socket]);
  useEffect(() => {
    if (gameState.turn === 0) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  }, [gameState]);

  return (
    <div className="p-[10px] overflow-hidden">
      {isPlaying ? <PlayingVideoChat /> : <WaitingVideoChat />}
    </div>
  );
};

export default VideoChat;
