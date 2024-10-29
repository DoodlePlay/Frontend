import React from 'react';

export interface Position {
  src: string;
  left: number;
  top: number;
}

interface ToxicEffectProps {
  toxicEffectPositions: Position[];
}

const ToxicEffect: React.FC<ToxicEffectProps> = ({ toxicEffectPositions }) => {
  return (
    <div className="absolute left-0 top-0 w-full h-full">
      {toxicEffectPositions.map((pos, index) => (
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
