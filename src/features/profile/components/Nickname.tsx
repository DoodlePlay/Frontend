'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import Avatar from '../../../components/Avatar/Avatar';
import Button from '../../../components/Button/Button';
import SpeechBubble from '../../../components/SpeechBubble';
import useUserInfoStore from '../store/userInfoStore';
import playSound from '../../../utils/helpers/playSound';

export const Avatars = [
  { id: 1, src: '/images/avatars/man1.svg' },
  { id: 2, src: '/images/avatars/woman2.svg' },
  { id: 3, src: '/images/avatars/man2.svg' },
  { id: 4, src: '/images/avatars/man3.svg' },
  { id: 5, src: '/images/avatars/woman5.svg' },
  { id: 6, src: '/images/avatars/man4.svg' },
  { id: 7, src: '/images/avatars/woman4.svg' },
  { id: 8, src: '/images/avatars/man5.svg' },
  { id: 9, src: '/images/avatars/woman9.svg' },
  { id: 10, src: '/images/avatars/man6.svg' },
  { id: 11, src: '/images/avatars/man7.svg' },
  { id: 12, src: '/images/avatars/woman3.svg' },
  { id: 13, src: '/images/avatars/man9.svg' },
  { id: 14, src: '/images/avatars/man10.svg' },
  { id: 15, src: '/images/avatars/woman1.svg' },
  { id: 16, src: '/images/avatars/woman6.svg' },
  { id: 17, src: '/images/avatars/man8.svg' },
  { id: 18, src: '/images/avatars/woman7.svg' },
  { id: 19, src: '/images/avatars/man11.svg' },
  { id: 20, src: '/images/avatars/woman8.svg' },
];

interface FormData {
  nickname: string;
}

const Nickname = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setNickname, clickedAvatarIndex, onAvatarClick } = useUserInfoStore();
  const router = useRouter();
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
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onSubmit',
  });

  const validateNickname = (nickname: string) => {
    const trimmedNickname = nickname.trim();
    return (
      /^[\uAC00-\uD7A3]{2,6}$/.test(trimmedNickname) ||
      '한글 2 ~ 6 자로 입력하세요.'
    );
  };

  const onSubmit = (data: FormData) => {
    playSound('/sounds/sampleButtonClick.mp3');
    setNickname(data.nickname);
    router.push('/room');
  };

  return (
    <div className="relative flex flex-col items-center pt-[38px] px-[78px] space-y-[40px]">
      <h1 className="font-bold text-[32px] mb-[13px]">닉네임 설정</h1>
      <button
        className="absolute top-[85px] right-[160px] z-10"
        onClick={() => setIsOpen(!isOpen)}
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
      <form>
        <div className="flex items-center">
          <img src="/images/People.svg" alt="people icon" />
          <label className="font-bold text-2xl ml-[10px] whitespace-nowrap">
            닉네임 :
          </label>
          <input
            id="nickname"
            type="text"
            placeholder="한글 2 ~ 6자"
            className="w-[200px] h-[50px] ml-[10px] pl-[10px] rounded-[10px] border-[3px] border-black drop-shadow-button focus:outline-none text-xl font-bold placeholder:font-medium"
            spellCheck="false"
            maxLength={6}
            {...register('nickname', {
              required: '닉네임을 입력하세요.',
              validate: validateNickname,
              onChange: e => {
                const { value } = e.target;
                if (value.length > 6) {
                  e.target.value = value.slice(0, 6);
                }
              },
            })}
          />
        </div>
        {errors.nickname && (
          <div className="pl-[158px] mt-1">
            <span className="absolute  text-red-500">
              {errors.nickname.message}
            </span>
          </div>
        )}
        <div className="mt-[40px]">
          <Button
            type="submit"
            text="Play"
            color="primary"
            onClick={handleSubmit(onSubmit)}
            className="mt-[40px]"
          />
        </div>
      </form>
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
