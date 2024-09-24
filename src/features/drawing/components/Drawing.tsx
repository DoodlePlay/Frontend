'use client';
import TimerBar from './TimeBar';
import Toolbar from './Toolbar';

const Drawing = () => {
  const handleTimeUp = () => {
    console.log('Time Over!');
    // 타이머 종료 시 수행할 동작 추가
  };
  return (
    <div>
      <div className="flex flex-col gap-y-[20px] bg-white max-w-[780px] min-h-[630px] w-full h-full relative p-[20px] rounded-[10px] border-[4px] border-black">
        <h1 className="absolute left-0 right-0 top-0 -translate-y-1/2 m-auto">
          <img
            className="m-auto"
            src="/images/Logo.svg"
            alt="Logo"
            loading="lazy"
          />
        </h1>
        <Toolbar />
        <TimerBar duration={10} onComplete={handleTimeUp} />
      </div>
    </div>
  );
};
export default Drawing;
