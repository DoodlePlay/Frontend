import React from 'react';

interface KeywordPlateProps {
  title: string;
  isChoosing: boolean;
  score?: number;
}

const KeywordPlate: React.FC<KeywordPlateProps> = ({
  title,
  isChoosing,
  score,
}) => {
  return (
    <div
      className={`flex items-center justify-center bg-white rounded-[5px] drop-shadow-namePlate max-w-xs p-[5px] border-2 border-neutral-default ${
        isChoosing ? `cursor-pointer` : ''
      }`}
    >
      <div className="border-2 border-primary-default flex w-full rounded-[5px] items-center justify-center py-[10px] px-[15px] gap-[10px]">
        <span className="text-black font-bold text-2xl">{title}</span>
        {score !== undefined && (
          <span className={`text-secondary-default text-2xl font-bold`}>
            {score}점
          </span>
        )}
      </div>
    </div>
  );
};

export default KeywordPlate;
