import React from 'react';

interface KeywordPlateProps {
  title: string;
  isChoosing: boolean;
}

const KeywordPlate: React.FC<KeywordPlateProps> = ({ title, isChoosing }) => {
  return (
    <div
      className={`flex items-center justify-center bg-white rounded-[5px] drop-shadow-namePlate max-w-xs p-[5px] border-2 border-neutral-default ${
        isChoosing ? `cursor-pointer` : ''
      }`}
    >
      <div className="border-2 border-primary-default p-2 flex w-full rounded-[5px] items-center justify-center py-[10px]">
        <span className="text-black font-bold text-4xl">{title}</span>
      </div>
    </div>
  );
};

export default KeywordPlate;
