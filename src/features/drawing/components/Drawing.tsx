'use client';
import { useState } from 'react';
import TimeBar from './TimeBar';
import Toolbar from './Toolbar';

type QuizState = 'break-time' | 'time-over' | 'success' | 'idle';

// 각 아이템의 초기 상태를 정의합니다.
const initialItemsState = {
  ToxicCover: false,
  GrowingBomb: false,
  PhantomReverse: false,
  LaundryFlip: false,
  TimeCutter: false,
};

const Drawing: React.FC = () => {
  const [items, setItems] = useState(initialItemsState);
  const [quizState, setQuizState] = useState<QuizState>('idle'); // 초기 상태는 'idle'

  //test용
  items.ToxicCover = true;
  items.PhantomReverse = true;

  // 상황에 따른 백그라운드 이미지를 설정합니다.
  const getBackgroundImage = () => {
    switch (quizState) {
      case 'break-time':
        return '/images/drawing/break-time.png';
      case 'time-over':
        return '/images/drawing/time-over.png';
      case 'success':
        return '/images/drawing/success.png';
      default:
        return ''; // 기본적으로 백그라운드 이미지를 설정하지 않습니다.
    }
  };

  const handleTimeUp = () => {
    setQuizState('time-over'); // 타임오버 상태로 전환
    console.log('Time Over!');
  };

  const handleCorrectAnswer = () => {
    setQuizState('success'); // 정답을 맞췄을 때 상태 전환
    console.log('Correct Answer!');
  };

  const handleNextQuiz = () => {
    setQuizState('break-time'); // 다음 퀴즈로 넘어갈 때 상태 전환
    console.log('Next Quiz - Break Time!');
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${getBackgroundImage()})`,
          backgroundSize: '40%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className="flex flex-col gap-y-[20px] bg-white max-w-[780px] min-h-[630px] w-full h-full relative p-[20px] rounded-[10px] border-[4px] border-black"
      >
        <h1 className="absolute left-0 right-0 top-0 -translate-y-1/2 m-auto">
          <img
            className="m-auto"
            src="/images/Logo.svg"
            alt="Logo"
            loading="lazy"
          />
        </h1>
        <div className="flex justify-between">
          <Toolbar />
          <ul className="flex flex-col max-w-[70px]">
            {/* 각 아이템의 활성화 상태에 따라 이미지 렌더링 */}
            {items.ToxicCover && (
              <li>
                <img src="/images/drawing/toxic-cover.png" alt="Toxic Cover" />
              </li>
            )}
            {items.GrowingBomb && (
              <li>
                <img
                  src="/images/drawing/growing-bomb.png"
                  alt="Growing Bomb"
                />
              </li>
            )}
            {items.PhantomReverse && (
              <li>
                <img
                  src="/images/drawing/phantom-reverse.png"
                  alt="Phantom Reverse"
                />
              </li>
            )}
            {items.LaundryFlip && (
              <li>
                <img
                  src="/images/drawing/laundry-flip.png"
                  alt="Laundry Flip"
                />
              </li>
            )}
            {items.TimeCutter && (
              <li>
                <img src="/images/drawing/time-cutter.png" alt="Time Cutter" />
              </li>
            )}
          </ul>
        </div>
        <TimeBar duration={10} onComplete={handleTimeUp} />
      </div>
    </div>
  );
};

export default Drawing;
