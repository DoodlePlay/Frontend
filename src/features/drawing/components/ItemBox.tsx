import React, { useState } from 'react';

import SpeechBubble from '../../../components/SpeechBubble/SpeechBubble';
import useItemStore from '../store/useItemStore';
import useSocketStore from '../../socket/socketStore';

const items = [
  {
    id: 'toxicCover',
    image: '/images/drawing/items/toxicCover.png',
    description: '군데군데 독극물을 뿌린다.',
  },
  {
    id: 'growingBomb',
    image: '/images/drawing/items/growingBomb.png',
    description: '5초간 폭발이 발생한다.',
  },
  {
    id: 'phantomReverse',
    image: '/images/drawing/items/phantomReverse.png',
    description: '글자를 거꾸로 입력한다.',
  },
  {
    id: 'laundryFlip',
    image: '/images/drawing/items/laundryFlip.png',
    description: '그림을 뒤집는다.',
  },
  {
    id: 'timeCutter',
    image: '/images/drawing/items/timeCutter.png',
    description: '시간의 반을 먹어치운다.',
  },
];

const ItemBox: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { socket, roomId, gameState } = useSocketStore();
  const { itemUsageState, setItemUsed } = useItemStore();

  const onHandleItemClick = (itemId: string) => {
    if (
      gameState.gameStatus === 'drawing' &&
      !itemUsageState[itemId as keyof typeof itemUsageState] &&
      !gameState.items[itemId as keyof typeof itemUsageState].status &&
      !isAnyItemUsedThisRound
    ) {
      setItemUsed(itemId as keyof typeof itemUsageState, gameState.round);

      if (socket) socket.emit('itemUsed', roomId, itemId);
    }
  };

  const isAnyItemUsedThisRound = Object.values(itemUsageState).some(
    item => item !== null && item === gameState.round
  );

  return (
    <div className="relative flex flex-col items-center justify-center bg-primary-default p-4 rounded-lg border-black border-[4px] drop-shadow-drawing z-20">
      <h2
        className="text-secondary-default text-2xl font-bold mb-2 font-cherry"
        style={{
          textShadow:
            '2px 2px 0px white, -2px -2px 0px white,2px -2px 0px white, -2px 2px 0px white',
        }}
      >
        ITEM
      </h2>
      <div className="flex justify-between w-full">
        {items.map(item => (
          <div
            key={item.id}
            className="relative max-w-[70px] max-h-[70px] bg-white border-[3px] border-black rounded-[5px] z-30 cursor-pointer"
          >
            <div
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => onHandleItemClick(item.id)}
            >
              <img
                src={item.image}
                alt={item.id}
                className="w-full h-full object-contain"
                draggable={false}
              />
            </div>

            {(gameState.items[item.id as keyof typeof itemUsageState].status ||
              isAnyItemUsedThisRound ||
              itemUsageState[item.id as keyof typeof itemUsageState] !==
                null) && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                {itemUsageState[item.id as keyof typeof itemUsageState] !==
                  null && (
                  <img
                    src="/images/drawing/inactiveCross.png"
                    alt="inactive"
                    draggable={false}
                  />
                )}
              </div>
            )}

            {hoveredItem === item.id && (
              <SpeechBubble isAvatarSelected={false} title={item.id}>
                {item.description}
              </SpeechBubble>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemBox;
