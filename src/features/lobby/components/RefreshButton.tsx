import React, { useState } from 'react';

interface RefreshButtonProps {
  onClick: () => Promise<void>;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ onClick }) => {
  const [isLoading, setLoading] = useState(false);

  const onClickRefresh = async () => {
    setLoading(true);

    const minimumLoadingTime = 1000;
    const startTime = Date.now();

    try {
      await onClick();
    } catch (error) {
      console.log(error);
    } finally {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = minimumLoadingTime - elapsedTime;

      setTimeout(() => setLoading(false), Math.max(0, remainingTime));
    }
  };

  return (
    <div
      onClick={onClickRefresh}
      className="flex items-center justify-center border-4 border-black rounded-[10px] w-[70px] h-[60px] cursor-pointer transform transition-transform duration-200 hover:scale-110"
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
