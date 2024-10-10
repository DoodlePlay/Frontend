'use client';

import { useEffect, useState } from 'react';

import Avatar from '../../../components/Avatar/Avatar';
import { Avatars } from '../../profile/components/Nickname';
import NamePlate from '../../../components/NamePlate/NamePlate';
import useUserInfoStore from '../../profile/store/userInfoStore';

const data = {
  turn: 2,
  order: [1, 2, 3, 4, 5, 6],
  currentDrawer: 1,
  participants: {
    1: {
      nickname: '권도형권도형',
      score: 0,
      clickedAvatarIndex: 0,
      isVideoOn: false,
      isFlipped: true,
    },
    2: {
      nickname: '김영재',
      score: 0,
      clickedAvatarIndex: 1,
      isVideoOn: false,
      isFlipped: true,
    },
    3: {
      nickname: '변정민',
      score: 0,
      clickedAvatarIndex: 2,
      isVideoOn: false,
      isFlipped: true,
    },
    4: {
      nickname: '황수민',
      score: 0,
      clickedAvatarIndex: 3,
      isVideoOn: false,
      isFlipped: true,
    },
    5: {
      nickname: '그림쟁이',
      score: 0,
      clickedAvatarIndex: 4,
      isVideoOn: false,
      isFlipped: true,
    },
    6: {
      nickname: '이웅모',
      score: 0,
      clickedAvatarIndex: 5,
      isVideoOn: false,
      isFlipped: true,
    },
  },
};

const PlayingVideoChat = () => {
  const [sortedOrder, setSortedOrder] = useState([]);
  const { nickname } = useUserInfoStore();
  const [correctIds, setCorrectIds] = useState([]);
  const [length, setLength] = useState(100);

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
    const arr = [];
    for (let i = 0; i < data.order.length; i++) {
      if (data.order[i] === data.currentDrawer) {
        arr.unshift(data.currentDrawer);
        continue;
      }
      arr.push(data.order[i]);
    }
    setSortedOrder(arr);
  }, [data.turn]);

  const onPlusScore = userId => {
    setCorrectIds(prevIds => [...prevIds, userId]);
    setTimeout(() => {
      setCorrectIds(prevIds => prevIds.filter(id => id !== userId));
    }, 2000);
  };
  const handleMargin = length => {
    return Math.min(100 - length * 0.55, 100);
  };

  return (
    <div className="flex flex-wrap gap-y-[10px]">
      {sortedOrder.map((userId, index) => (
        <div
          key={index}
          onClick={() => {
            onPlusScore(userId);
          }}
          className={`relative flex flex-col justify-center items-center ${(() => {
            if (data.order.length === 2) {
              if (index === 0) return 'w-full';
              else return 'w-full mb-[179px]';
            }
            if (data.order.length === 3) {
              if (index === 0) return 'w-full';
              else return 'w-1/2 mb-[179px]';
            }
            if (data.order.length === 4) {
              if (index === 0) return 'w-full';
              if (index === 1 || index === 2) return ' mb-[179px]';
            }
            if (data.order.length === 5) {
              if (index === 0) return 'w-full';
              else return 'w-1/2';
            }
            if (data.order.length === 6) {
              if (index === 0) return 'w-full';

              if (index === 4) return 'w-[100px] ml-[73px] ';
            }
            return '';
          })()}`} // 즉시 실행 함수로 수정
          style={(() => {
            if (data.order.length === 4) {
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
            if (data.order.length === 6) {
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
            src={Avatars[data.participants[userId].clickedAvatarIndex].src}
            size={userId === data.currentDrawer ? 'large' : 'small'}
            isMyCharacter={data.participants[userId].nickname === nickname}
            className={`${
              correctIds.includes(userId) ? 'filter brightness-[0.6]' : ''
            }`}
          />
          <NamePlate
            title={data.participants[userId].nickname}
            score={data.participants[userId].score}
            isDrawingActive={userId === data.currentDrawer}
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
            + 10
          </div>
        </div>
      ))}
    </div>
  );
};
export default PlayingVideoChat;
