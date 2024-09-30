'use client';

import { useEffect, useState } from 'react';

import Avatar from '../../../components/Avatar/Avatar';
import { Avatars } from '../../profile/components/Nickname';
import NamePlate from '../../../components/NamePlate';
import useUserInfoStore from '../../profile/store/userInfoStore';

const data = {
  turn: 2,
  order: [111, 222, 333, 444, 555, 666],
  currentDrawer: 111,
  participants: {
    111: {
      nickname: '권도형권도형',
      score: 0,
      clickedAvatarIndex: 0,
      isVideoOn: false,
      isFlipped: true,
    },
    222: {
      nickname: '김영재',
      score: 0,
      clickedAvatarIndex: 1,
      isVideoOn: false,
      isFlipped: true,
    },
    333: {
      nickname: '변정민',
      score: 0,
      clickedAvatarIndex: 2,
      isVideoOn: false,
      isFlipped: true,
    },
    444: {
      nickname: '황수민',
      score: 0,
      clickedAvatarIndex: 3,
      isVideoOn: false,
      isFlipped: true,
    },
    555: {
      nickname: '그림쟁이',
      score: 0,
      clickedAvatarIndex: 4,
      isVideoOn: false,
      isFlipped: true,
    },
    666: {
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
  return (
    <div className="flex flex-wrap gap-y-[10px]">
      {sortedOrder.map((userId, index) => (
        <div
          key={userId}
          className={`flex flex-col items-center ${(() => {
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
              if (index === 1 || index === 2) return 'mr-[60px] mb-[179px]';
            }
            if (data.order.length === 5) {
              if (index === 0) return 'w-full';
              else return 'w-1/2';
            }
            if (data.order.length === 6) {
              if (index === 0) return 'w-full';
              if (index === 1 || index === 2) return 'mr-[60px]';
              if (index === 4) return 'w-[100px] ml-[80px] mr-[60px]';
            }
            return '';
          })()}`} // 즉시 실행 함수로 수정
        >
          <Avatar
            src={Avatars[data.participants[userId].clickedAvatarIndex].src}
            size={userId === data.currentDrawer ? 'large' : 'small'}
            isMyCharacter={data.participants[userId].nickname === nickname}
          />
          <NamePlate
            title={data.participants[userId].nickname}
            score={data.participants[userId].score}
            isDrawingActive={userId === data.currentDrawer}
          />
        </div>
      ))}
    </div>
  );
};
export default PlayingVideoChat;
