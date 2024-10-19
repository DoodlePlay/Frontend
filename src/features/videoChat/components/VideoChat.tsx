'use client';

import { useEffect, useState } from 'react';

import useSocketStore from '../../socket/socketStore';
import PlayingVideoChat from './PlayingVideoChat';
import WaitingVideoChat from './WaitingVideoChat';

const VideoChat = () => {
  const gameState = useSocketStore(state => state.gameState);
  const socket = useSocketStore(state => state.socket);
  const [state, setState] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on('game started', () => {
        setState(true);
      });

      return () => {
        socket.off('game started');
      };
    }
  }, [socket]);

  useEffect(() => {
    if (gameState.turn === 0) {
      setState(false);
    } else {
      setState(true);
    }
  }, [gameState]);

  return (
    <div className="p-[10px] overflow-hidden">
      {state ? <PlayingVideoChat /> : <WaitingVideoChat />}
    </div>
  );
};

export default VideoChat;
