import { useEffect, useState } from 'react';
import Avatar from '../../../components/Avatar/Avatar';
import NamePlate from '../../../components/NamePlate/NamePlate';
import { Avatars } from '../../profile/components/Nickname';
import useUserInfoStore from '../../profile/store/userInfoStore';
import useSocketStore from '../../socket/socketStore';

const WaitingVideoChat = () => {
  const [order, setOrder] = useState([]);
  const { nickname } = useUserInfoStore();
  const { gameState } = useSocketStore();

  useEffect(() => {
    if (!gameState) return; // socket 또는 gameState가 null인 경우 종료

    setOrder(gameState.order);
  }, [gameState]); // socket, gameState의 변경을 감지하여 useEffect 실행

  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-y-[10px]">
      {order.map(
        (userId, index) =>
          gameState?.participants[userId] ? ( // 유저가 존재하는 경우에만 렌더링
            <div key={index} className="flex justify-center">
              <div key={index}>
                <Avatar
                  src={
                    Avatars[gameState.participants[userId].clickedAvatarIndex]
                      .src
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
          ) : null // 존재하지 않으면 null로 반환
      )}
    </div>
  );
};

export default WaitingVideoChat;
