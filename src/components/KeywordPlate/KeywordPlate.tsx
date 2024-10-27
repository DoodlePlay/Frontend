import React from 'react';

import useSocketStore from '../../features/socket/socketStore';

interface KeywordPlateProps {
  title: string;
  isChoosing: boolean;
}

const KeywordPlate: React.FC<KeywordPlateProps> = ({ title, isChoosing }) => {
  const { socket, roomId } = useSocketStore();

  const onWordClick = () => {
    if (isChoosing && socket && roomId) {
      socket.emit('chooseWord', roomId, title);
    }
  };
  return (
    <div
      className={`flex items-center justify-center bg-white rounded-[5px] drop-shadow-namePlate max-w-xs p-[5px] border-2 border-neutral-default ${
        isChoosing ? `cursor-pointer` : ''
      }`}
      onClick={onWordClick}
    >
      <div className="border-2 border-primary-default p-2 flex w-full rounded-[5px] items-center justify-center py-[10px]">
        <span className="text-black font-bold text-4xl">{title}</span>
      </div>
    </div>
  );
};

export default KeywordPlate;
