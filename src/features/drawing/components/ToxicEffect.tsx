import React, { useEffect, useState } from 'react';

const toxicImagePaths = [
  '/images/drawing/items/effects/toxic01.svg',
  '/images/drawing/items/effects/toxic02.svg',
  '/images/drawing/items/effects/toxic03.svg',
  '/images/drawing/items/effects/toxic04.svg',
  '/images/drawing/items/effects/toxic05.svg',
  '/images/drawing/items/effects/toxic06.svg',
  '/images/drawing/items/effects/toxic07.svg',
];

interface Position {
  src: string;
  left: number;
  top: number;
}

const ToxicEffect: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    const step = Math.floor(80 / Math.sqrt(7));
    let leftPos = 0;
    let topPos = 0;

    const newPositions: Position[] = Array.from({ length: 7 }, (_, i) => {
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
  }, []);

  return (
    <div className="absolute left-0 top-0 w-full h-full">
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
    </div>
  );
};

export default ToxicEffect;
