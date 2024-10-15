'use client';

import { useEffect, useState } from 'react';

import Avatar from '../../../components/Avatar/Avatar';
import NamePlate from '../../../components/NamePlate/NamePlate';
import { Avatars } from '../../profile/components/Nickname';
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

const WaitingVideoChat = () => {
  const [order, setOrder] = useState([]);
  const { nickname } = useUserInfoStore();
  useEffect(() => {
    setOrder(data.order);
  }, []);
  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-y-[55px]">
      {order.map((userId, index) => (
        <div key={index} className="flex justify-center">
          <div key={index}>
            <Avatar
              src={Avatars[data.participants[userId].clickedAvatarIndex].src}
              size={'small'}
              isMyCharacter={data.participants[userId].nickname === nickname}
            />
            <NamePlate
              title={data.participants[userId].nickname}
              score={data.participants[userId].score}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
export default WaitingVideoChat;
