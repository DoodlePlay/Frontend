import React from 'react';

interface RoomCardProps {
  name: string;
  maxPlayers: number;
  currentPlayers: number;
  rounds: number;
  topic: string;
  gameStatus: string;
  isItemsEnabled: boolean;
  isPublic: boolean;
}

const RoomCard: React.FC<RoomCardProps> = ({
  name,
  maxPlayers,
  currentPlayers,
  rounds,
  topic,
  gameStatus,
  isItemsEnabled,
  isPublic,
}) => {
  return (
    <div className="flex flex-col p-[10px] w-[320px] h-[135px] rounded-[10px] border-[3px] border-black bg-white drop-shadow-roomCard cursor-pointer">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-bold truncate">{name}</h2>
        {!isPublic && (
          <img
            src="/images/lobby/privateRoom.svg"
            alt="Private Room Icon"
            draggable="false"
          />
        )}
      </div>
      <div className="w-full h-[2px] bg-black my-2" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[5px]">
          <img
            src="/images/lobby/players.svg"
            alt="Players Icon"
            draggable="false"
          />
          <span className="text-[15px]">
            {currentPlayers}/{maxPlayers}
          </span>
        </div>
        <div className="flex items-center gap-[5px]">
          <img
            src="/images/lobby/topic.svg"
            alt="Topic Icon"
            draggable="false"
          />
          <span className="text-[15px]">{topic}</span>
        </div>
        <div className="flex items-center gap-[5px]">
          <img src="/images/lobby/item.svg" alt="Item Icon" draggable="false" />
          <span className="text-[15px]">
            {isItemsEnabled ? '아이템 O' : '아이템 X'}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center gap-[5px]">
          <img
            src="/images/lobby/rounds.svg"
            alt="Rounds Icon"
            draggable="false"
          />
          <span className="text-base font-bold">{rounds} 라운드</span>
        </div>
        {gameStatus === 'waiting' ? (
          <div className="flex items-center gap-[5px]">
            <img
              src="/images/lobby/waiting.svg"
              alt="Waiting Icon"
              draggable="false"
            />
            <span className="text-base font-bold">대기중</span>
          </div>
        ) : (
          <div className="flex items-center gap-[5px]">
            <img
              src="/images/lobby/playing.svg"
              alt="Playing Icon"
              draggable="false"
            />
            <span className="text-base font-bold">게임중</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomCard;
