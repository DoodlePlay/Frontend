'use client';

import { useEffect, useRef, useState } from 'react';

import Avatar from '../../../components/Avatar/Avatar';
import Button from '../../../components/Button/Button';
import SpeechBubble from '../../../components/SpeechBubble';

const Avatars = [
  { id: 1, src: '/images/avatars/man-1.svg' },
  { id: 2, src: '/images/avatars/woman-2.svg' },
  { id: 3, src: '/images/avatars/man-2.svg' },
  { id: 4, src: '/images/avatars/man-3.svg' },
  { id: 5, src: '/images/avatars/woman-5.svg' },
  { id: 6, src: '/images/avatars/man-4.svg' },
  { id: 7, src: '/images/avatars/woman-4.svg' },
  { id: 8, src: '/images/avatars/man-5.svg' },
  { id: 9, src: '/images/avatars/woman-9.svg' },
  { id: 10, src: '/images/avatars/man-6.svg' },
  { id: 11, src: '/images/avatars/man-7.svg' },
  { id: 12, src: '/images/avatars/woman-3.svg' },
  { id: 13, src: '/images/avatars/man-9.svg' },
  { id: 14, src: '/images/avatars/man-10.svg' },
  { id: 15, src: '/images/avatars/woman-1.svg' },
  { id: 16, src: '/images/avatars/woman-6.svg' },
  { id: 17, src: '/images/avatars/man-8.svg' },
  { id: 18, src: '/images/avatars/woman-7.svg' },
  { id: 19, src: '/images/avatars/man-11.svg' },
  { id: 20, src: '/images/avatars/woman-8.svg' },
];

const Nickname = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedAvatarIndex, setClickedAvatarIndex] = useState(0);
  const bubbleRef = useRef(null);

  useEffect(() => {
    const onClickOutside = event => {
      if (bubbleRef.current && !bubbleRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', onClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [isOpen, clickedAvatarIndex]);

  const onAvatarClick = (index: number) => {
    setClickedAvatarIndex(index);
  };

  return (
    <div className="relative  flex flex-col items-center pt-[38px] px-[78px] space-y-[40px]">
      <h1 className="font-bold text-[32px] mb-[13px]">닉네임 설정</h1>
      <button
        className="absolute top-[85px] right-[160px] z-10"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <img
          src="/images/EditButton.svg"
          alt="Edit Character"
          className="hover:scale-105 transition-transform duration-100"
        />
      </button>
      <Avatar
        src={Avatars[clickedAvatarIndex].src}
        isMyCharacter
        size="large"
      />
      <div className="flex items-center">
        <img src="/images/People.svg" alt="people icon" />
        <span className="font-bold text-2xl ml-[10px] whitespace-nowrap">
          닉네임 :
        </span>
        <input
          type="text"
          placeholder="입력하세요"
          className="w-[200px] h-[50px] ml-[10px] pl-[10px] rounded-[10px] border-[3px] border-black drop-shadow-button focus:outline-none text-xl font-bold  placeholder:font-medium"
          spellCheck="false"
        />
      </div>
      <Button text="Play" color="primary" onClick={() => {}} />
      <div
        ref={bubbleRef}
        className={`absolute top-[125px] left-[45px] z-20 ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <SpeechBubble isAvatarSelected>
          <div className="grid grid-cols-4 w-[520px] h-[350px] p-2 gap-y-10 overflow-y-scroll">
            {Avatars.map((avatar, index) => (
              <div
                key={avatar.id}
                className="cursor-pointer"
                onClick={() => onAvatarClick(index)}
              >
                <Avatar
                  src={avatar.src}
                  size="small"
                  isClicked={clickedAvatarIndex === index}
                />
              </div>
            ))}
          </div>
        </SpeechBubble>
      </div>
    </div>
  );
};
export default Nickname;
