'use client';

import Button from '../components/Button/Button';

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
    </div>
  );
};

export default HomePage;
