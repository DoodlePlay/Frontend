'use client';

import { useEffect, useState } from 'react';

import TimeBar from './TimeBar';
import Toolbar from './Toolbar';

type QuizState = 'breakTime' | 'timeOver' | 'success' | 'wait' | 'choose';

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
  const [quizState, setQuizState] = useState<QuizState>('wait');
  const [comment, setComment] = useState('');

  //test용
  items.ToxicCover = true;
  items.PhantomReverse = true;

  // 상황에 따른 백그라운드 이미지를 설정합니다.
  const getBackgroundImage = () => {
    switch (quizState) {
      case 'breakTime':
        return '/images/drawing/break-time.png';
      case 'timeOver':
        return '/images/drawing/time-over.png';
      case 'success':
        return '/images/drawing/success.png';
      default:
        return ''; // 기본적으로 백그라운드 이미지를 설정하지 않습니다.
    }
  };

  // 상황에 따른 comment를 설정하는 useEffect
  useEffect(() => {
    switch (quizState) {
      case 'timeOver':
        setComment("Time's up");
        break;
      case 'breakTime':
        setComment('Break Time');
        break;
      case 'choose':
        setComment('Choose a word');
        break;
      default:
        setComment('');
    }
  }, [quizState]);

  //TODO: 출제자 확인 후 toolbar hidden

  // 타임오버 상태로 전환
  const handleTimeUp = () => {
    setQuizState('timeOver');
    console.log('Time Over!');
  };

  //TODO : 정답을 맞췄을 때 상태 전환
  const handleCorrectAnswer = () => {
    setQuizState('success');
    console.log('Correct Answer!');
  };

  //TODO : 다음 퀴즈로 넘어갈 때 상태 전환
  const handleNextQuiz = () => {
    setQuizState('breakTime');
    console.log('Next Quiz - Break Time!');
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${getBackgroundImage()})`,
          backgroundSize: comment === undefined ? '60%' : '40%',
          backgroundPosition: comment === undefined ? 'center' : 'center 30%',
          backgroundRepeat: 'no-repeat',
        }}
        className="flex flex-col gap-y-[20px] bg-white drop-shadow-drawing max-w-[780px] min-h-[630px] w-full h-full relative p-[20px] rounded-[10px] border-[4px] border-black"
      >
        <h1 className="absolute left-0 right-0 top-0 -translate-y-1/2 m-auto">
          <img
            className="m-auto"
            src="/images/Logo.svg"
            alt="Logo"
            loading="lazy"
          />
        </h1>
        <div className="absolute left-0 right-0 top-2/3 m-auto text-center font-cherry text-secondary-default text-6xl z-[-1]">
          {comment}
        </div>
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
