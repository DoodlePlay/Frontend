'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Avatar from '../../../components/Avatar/Avatar';
import { Avatars } from '../../profile/components/Nickname';
import NamePlate from '../../../components/NamePlate/NamePlate';
import useUserInfoStore from '../../profile/store/userInfoStore';
import useSocketStore from '../../socket/socketStore';
import playSound from '../../../utils/helpers/playSound';

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
      playSound('/sounds/correctSound.mp3');
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
            <AnimatePresence>
              {correctIds.includes(userId) && (
                <motion.div
                  key={userId}
                  className="absolute font-cherry font-bold text-primary-400"
                  initial={{
                    opacity: 0,
                    y: 50,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.6,
                      type: 'spring',
                      stiffness: 100,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: -50,
                    scale: 0.8,
                    transition: {
                      duration: 0.4,
                      ease: 'easeOut',
                    },
                  }}
                  style={{
                    top: index === 0 ? '50px' : '25px',
                    fontSize: index === 0 ? '4rem' : '2rem',
                  }}
                >
                  {index === 0 ? `+ ${drawerScore}` : `+ ${score}`}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : null
      )}
    </div>
  );
};
export default PlayingVideoChat;
