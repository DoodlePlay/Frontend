import React, { useEffect, useState } from 'react';

const toxicImagePaths = [
  '/images/drawing/items/effects/toxic_01.svg',
  '/images/drawing/items/effects/toxic_02.svg',
  '/images/drawing/items/effects/toxic_03.svg',
  '/images/drawing/items/effects/toxic_04.svg',
  '/images/drawing/items/effects/toxic_05.svg',
  '/images/drawing/items/effects/toxic_06.svg',
  '/images/drawing/items/effects/toxic_07.svg',
];

const ToxicEffect = ({
  count,
  gameState,
}: {
  count: number;
  gameState: string;
}) => {
  const [positions, setPositions] = useState<
    { src: string; left: number; top: number }[]
  >([]);

  useEffect(() => {
    if (gameState !== 'drawing') {
      setPositions([]); // drawing 상태가 아닐 때 positions를 빈 배열로 설정하여 이미지 삭제
      return;
    }

    const step = Math.floor(80 / Math.sqrt(count)); // 그리드 기반 위치 간격
    let leftPos = 0;
    let topPos = 0;

    const newPositions = Array.from({ length: count }, (_, i) => {
      const src = toxicImagePaths[i % toxicImagePaths.length];
      const left = leftPos + Math.random() * step;
      const top = topPos + Math.random() * step;

      leftPos += step;
      if (leftPos >= 80) {
        leftPos = 0;
        topPos += step;
      }

      return { src, left, top };
    });

    setPositions(newPositions);
  }, [count, gameState]);

  return (
    <>
      {positions.map((pos, index) => (
        <img
          key={index}
          src={pos.src}
          alt={`toxic effect ${index}`}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 scale-50 pointer-events-none z-10"
          style={{
            left: `${pos.left}%`,
            top: `${pos.top}%`,
          }}
        />
      ))}
    </>
  );
};

export default ToxicEffect;
