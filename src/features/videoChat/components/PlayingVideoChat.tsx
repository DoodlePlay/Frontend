'use client';

import { useEffect, useState } from 'react';

import Avatar from '../../../components/Avatar/Avatar';
import { Avatars } from '../../profile/components/Nickname';
import NamePlate from '../../../components/NamePlate';

const data = {
  turn: 1,
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
      nickname: '김영재김영재',
      score: 0,
      clickedAvatarIndex: 1,
      isVideoOn: false,
      isFlipped: true,
    },
    333: {
      nickname: '변정민변정민',
      score: 0,
      clickedAvatarIndex: 2,
      isVideoOn: false,
      isFlipped: true,
    },
    444: {
      nickname: '황수민황수민',
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
      nickname: '이웅모이웅모',
      score: 0,
      clickedAvatarIndex: 5,
      isVideoOn: false,
      isFlipped: true,
    },
  },
};

const PlayingVideoChat = () => {
  const [sortedOrder, setSortedOrder] = useState([]);
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
          className={`flex flex-col items-center ${
            index === 0
              ? 'w-full'
              : index === 1
              ? '  mr-[55px]'
              : index === 2
              ? ' mr-[55px]'
              : index === 4
              ? 'w-[100px] ml-[80px] mr-[60px]'
              : ''
          }`}
        >
          <Avatar
            src={Avatars[data.participants[userId].clickedAvatarIndex].src}
            size={userId === data.currentDrawer ? 'large' : 'small'}
            isMyCharacter={index === 0}
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
