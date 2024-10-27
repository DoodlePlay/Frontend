'use client';

import { useEffect, useState } from 'react';

import Avatar from '../../../components/Avatar/Avatar';
import NamePlate from '../../../components/NamePlate/NamePlate';
import { Avatars } from '../../profile/components/Nickname';
import useUserInfoStore from '../../profile/store/userInfoStore';
import useSocketStore from '../../socket/socketStore';

const WaitingVideoChat = () => {
  const [order, setOrder] = useState([]);
  const { nickname } = useUserInfoStore();
  const { socket, gameState, updateGameState } = useSocketStore();
  useEffect(() => {
    socket.on('gameStateUpdate', newGameState => {
      updateGameState(newGameState);
    });
    setOrder(gameState.order);
  }, [gameState]);
  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-y-[10px]">
      {order.map((userId, index) => (
        <div key={index} className="flex justify-center">
          <div key={index}>
            <Avatar
              src={
                Avatars[gameState.participants[userId].clickedAvatarIndex].src
              }
              size={'waiting'}
              isMyCharacter={
                gameState.participants[userId].nickname === nickname
              }
            />
            <NamePlate
              title={gameState.participants[userId].nickname}
              score={gameState.participants[userId].score}
              isWaiting
            />
          </div>
        </div>
      ))}
    </div>
  );
};
export default WaitingVideoChat;
