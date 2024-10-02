'use client';

import Button from '../../../components/Button/Button';

const GameControlButtons = () => {
  const onStartGame = () => {
    console.log('Game started');
    // 게임 시작 로직을 여기에 추가합니다.
  };

  const onExitGame = () => {
    console.log('Game exited');
    // 게임 종료 로직을 여기에 추가합니다.
  };

  //TODO: 방장(host)만 게임이 진행되기 전에만 start 버튼 보이도록

  return (
    <div className="w-full flex gap-x-[30px]">
      <Button text="START" color="primary" onClick={onStartGame} />
      <Button text="EXIT" color="secondary" onClick={onExitGame} />
    </div>
  );
};

export default GameControlButtons;
