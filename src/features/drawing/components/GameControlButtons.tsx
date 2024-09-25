'use client';

import Button from '../../../components/Button/Button';

const GameControlButtons = () => {
  const handleStartGame = () => {
    console.log('Game started');
    // 게임 시작 로직을 여기에 추가합니다.
  };

  const handleExitGame = () => {
    console.log('Game exited');
    // 게임 종료 로직을 여기에 추가합니다.
  };

  return (
    <div>
      <Button text="START" color="primary" onClick={handleStartGame} />
      <Button text="EXIT" color="secondary" onClick={handleExitGame} />
    </div>
  );
};

export default GameControlButtons;
