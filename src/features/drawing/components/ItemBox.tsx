'use client';

import { useState } from 'react';
import SpeechBubble from '../../../components/SpeechBubble/SpeechBubble';

const items = [
  {
    id: 'Toxic-Cover',
    image: '/images/drawing/toxic-cover.png',
    isActive: false,
    description: '군데군데 독극물을 뿌린다.',
  },
  {
    id: 'Growing-Bomb',
    image: '/images/drawing/growing-bomb.png',
    isActive: true,
    description: '5초간 폭발이 발생한다.',
  },
  {
    id: 'Phantom-Reverse',
    image: '/images/drawing/phantom-reverse.png',
    isActive: true,
    description: '글자를 거꾸로 입력한다.',
  },
  {
    id: 'Laundry-Flip',
    image: '/images/drawing/laundry-flip.png',
    isActive: false,
    description: '그림을 뒤집는다.',
  },
  {
    id: 'Time-Cutter',
    image: '/images/drawing/time-cutter.png',
    isActive: true,
    description: '시간의 반을 먹어치운다.',
  },
];

const ItemBox = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="relative flex flex-col items-center justify-center bg-primary-default p-4 rounded-lg border-black border-[4px] drop-shadow-drawing z-20">
      <h2
        className="text-green-800 text-2xl font-bold mb-2 font-cherry"
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
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <img
              src={item.image}
              alt={item.id}
              className="w-full h-full object-contain"
            />
            {!item.isActive && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: 'rgba(0, 0, 0, 0.2)' }}
              >
                <img src="/images/drawing/inactive-cross.png" alt="inactive" />
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
