'use client';
import { useEffect, useState } from 'react';
import useSocketStore from '../../socket/socketStore';
import PlayingVideoChat from './PlayingVideoChat';
import WaitingVideoChat from './WaitingVideoChat';

const VideoChat = () => {
  const { gameState } = useSocketStore();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (gameState && typeof gameState.turn === 'number') {
      setIsPlaying(gameState.turn !== 0);
    }
  }, [gameState]);

  return (
    <div className="p-[10px] overflow-hidden">
      {isPlaying ? <PlayingVideoChat /> : <WaitingVideoChat />}
    </div>
  );
};

export default VideoChat;
