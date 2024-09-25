import React, { useState } from 'react';

interface RefreshButtonProps {
  onClick: () => Promise<void>;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ onClick }) => {
  const [isLoading, setLoading] = useState(false);

  const onClickRefresh = async () => {
    setLoading(true);

    try {
      await onClick(); // RoomList를 새로 가져오는 함수를 호출
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClickRefresh}
      className="cursor-pointer inline-block transform transition-transform duration-200 hover:scale-110"
    >
      <img
        src="/images/lobby/refresh.svg"
        alt="Refresh Icon"
        draggable="false"
        className={`${isLoading ? 'animate-spin' : ''}`}
      />
    </div>
  );
};

export default RefreshButton;
