'use client';

import { useEffect, useState } from 'react';

import Avatar from '../../../components/Avatar/Avatar';
import { Avatars } from '../../profile/components/Nickname';
import NamePlate from '../../../components/NamePlate/NamePlate';
import useUserInfoStore from '../../profile/store/userInfoStore';
import useSocketStore from '../../socket/socketStore';

const PlayingVideoChat = () => {
  const [sortedOrder, setSortedOrder] = useState([]);
  const { nickname } = useUserInfoStore();
  const [correctIds, setCorrectIds] = useState([]);
  const [length, setLength] = useState(100);
  const { socket, gameState } = useSocketStore();
  const [score, setScore] = useState(0);
  const [drawerScore, setDrawerScore] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const viewportHeight = window.innerHeight;

      const newLength = Math.min(viewportHeight * 0.1, 100);
      if (viewportHeight <= 1000) setLength(newLength);
      else setLength(100);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!gameState) return;
    const arr = [];
    for (let i = 0; i < gameState.order.length; i++) {
      if (gameState.order[i] === gameState.currentDrawer) {
        arr.unshift(gameState.currentDrawer);
        continue;
      }
      arr.push(gameState.order[i]);
    }
    setSortedOrder(arr);
  }, [gameState]);

  const onPlusScore = userId => {
    setCorrectIds(prevIds => [...prevIds, userId]);
    setTimeout(() => {
      setCorrectIds(prevIds => prevIds.filter(id => id !== userId));
    }, 1000);
  };
  const handleMargin = length => {
    return Math.min(100 - length * 0.55, 100);
  };

  useEffect(() => {
    if (!socket) return;

    socket.on('playScoreAnimation', (userId, score) => {
      setScore(score);
      onPlusScore(userId);
    });
    socket.on('playDrawerScoreAnimation', (userId, score) => {
      setDrawerScore(score);
      onPlusScore(userId);
    });

    return () => {
      socket.off('playScoreAnimation', (userId, score) => {
        setScore(score);
        onPlusScore(userId);
      });
      socket.off('playDrawerScoreAnimation', (userId, score) => {
        setDrawerScore(score);
        onPlusScore(userId);
      });
    };
  }, [socket]);

  return (
    <div className="flex flex-wrap gap-y-[10px]">
      {sortedOrder.map((userId, index) =>
        gameState?.participants[userId] ? (
          <div
            key={userId}
            className={`relative flex flex-col justify-center items-center ${(() => {
              if (gameState.order.length === 2) {
                if (index === 0) return 'w-full';
                else return 'w-full mb-[179px]';
              }
              if (gameState.order.length === 3) {
                if (index === 0) return 'w-full';
                else return 'w-1/2 mb-[179px]';
              }
              if (gameState.order.length === 4) {
                if (index === 0) return 'w-full';
                if (index === 1 || index === 2 || index === 3)
                  return ' mb-[179px]';
              }
              if (gameState.order.length === 5) {
                if (index === 0) return 'w-full';
                else return 'w-1/2';
              }
              if (gameState.order.length === 6) {
                if (index === 0) return 'w-full';
                if (index === 4) return 'w-[100px] ml-[73px] ';
              }
              return '';
            })()}`} // 즉시 실행 함수로 수정
            style={(() => {
              if (gameState.order.length === 4) {
                if (index === 1)
                  return {
                    marginLeft: `${100 - length}px`,
                    marginRight: `${handleMargin(length)}px`,
                  };
                if (index === 2)
                  return {
                    marginRight: `${handleMargin(length)}px`,
                  };
              }
              if (gameState.order.length === 6) {
                if (index === 1)
                  return {
                    marginLeft: `${100 - length}px`,
                    marginRight: `${handleMargin(length)}px`,
                  };
                if (index === 2)
                  return {
                    marginRight: `${handleMargin(length)}px`,
                  };
                if (index === 4)
                  return {
                    marginRight: `${handleMargin(length)}px`,
                  };
              }
              return {};
            })()} // 여기서 즉시 실행 함수로 수정
          >
            <Avatar
              src={
                Avatars[gameState.participants[userId].clickedAvatarIndex].src
              }
              size={index === 0 ? 'large' : 'small'}
              isMyCharacter={
                gameState.participants[userId].nickname === nickname
              }
              className={`${
                correctIds.includes(userId) ? 'filter brightness-[0.6]' : ''
              }`}
            />
            <NamePlate
              title={gameState.participants[userId].nickname}
              score={gameState.participants[userId].score}
              isDrawingActive={index === 0}
            />
            <div
              className={`absolute font-cherry font-bold text-primary-400 transition-transform duration-500 ease-in-out
              ${index === 0 ? 'top-[140px] text-4xl' : 'top-[70px] text-2xl'} ${
                correctIds.includes(userId)
                  ? 'opacity-100 visible'
                  : 'opacity-0 invisible'
              } ${
                correctIds.includes(userId)
                  ? index === 0
                    ? 'translate-y-[-70px]'
                    : 'translate-y-[-35px]'
                  : ''
              }`}
            >
              {index === 0 ? `+ ${drawerScore}` : `+ ${score}`}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};
export default PlayingVideoChat;
