'use client';

import Avatar from '../../../components/Avatar/Avatar';
import Button from '../../../components/Button/Button';

const Nickname = () => {
  return (
    <div className="relative  flex flex-col w-1/2 items-center pt-[38px] px-[78px] space-y-[40px]">
      <h1 className="font-bold text-[32px] mb-[13px]">닉네임 설정</h1>
      <button className="absolute top-[85px] right-[160px] z-10">
        <img src="/images/EditButton.svg" alt="Edit Character" />
      </button>
      <Avatar src="/images/avatars/man-1.svg" isMyCharacter size="large" />
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
    </div>
  );
};
export default Nickname;
