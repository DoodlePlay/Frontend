'use client';

import Button from '../components/Button/Button';
import Modal from '../components/Modal/Modal';

const HomePage = () => {
  const onClickButton = () => {
    console.log('Button Click!');
  };

  return (
    <div className="text-black">
      Profile Setting Page
      <div className="flex flex-col gap-4 w-2/5">
        <Button text="Play" color="primary" onClick={onClickButton} />
        <Button text="EXIT" color="secondary" onClick={onClickButton} />
        <Button text="No" color="neutral" onClick={onClickButton} />
      </div>
      <Modal isOpen title="비밀번호 입력" onClose={() => {}}>
        <p>비밀방에 입장하려면 비밀번호를 입력하세요.</p>
      </Modal>
    </div>
  );
};

export default HomePage;
