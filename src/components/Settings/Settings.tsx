'use client';

import React from 'react';

import ToggleButton from './ToggleButton';
import useVideoStore from '../../features/profile/store/videoStore';
import useFlipStore from '../../features/profile/store/flipStore';
import useSoundStore from '../../features/profile/store/soundStore';

const Settings = () => {
  const { isVideoOn, toggleVideo } = useVideoStore();
  const { isSoundOn, toggleSound } = useSoundStore();
  const { isFlipped, toggleFlip } = useFlipStore();

  return (
    <div className="flex flex-col justify-between">
      <div className="flex items-center mb-[10px]">
        <img src="/images/settings/gear.svg" alt="설정" />
        <span className="text-2xl font-bold ml-1 mr-3">카메라</span>
        <img
          src="/images/settings/cam-disabled.svg"
          alt="카메라 끄기"
          className={`${
            !isVideoOn
              ? 'filter-none'
              : 'filter-grayscale  opacity-20 transition-all duration-300'
          }`}
        />
        <div className="mx-[30px]">
          <ToggleButton isOn={isVideoOn} onToggle={toggleVideo} />
        </div>
        <img
          src="/images/settings/cam.svg"
          alt="카메라 켜기"
          className={`${
            isVideoOn
              ? 'filter-none'
              : 'filter-grayscale  opacity-20 transition-all duration-300'
          }`}
        />
      </div>
      <div className="flex items-center mb-[10px]">
        <img src="/images/settings/gear.svg" alt="이미지" />
        <span className="text-2xl font-bold ml-1 mr-3">효과음</span>
        <img
          src="/images/settings/speaker-none.svg"
          alt="효과음 끄기"
          className={`${
            !isSoundOn
              ? 'filter-none'
              : 'filter-grayscale  opacity-20 transition-all duration-300'
          }`}
        />
        <div className="mx-[30px]">
          <ToggleButton isOn={isSoundOn} onToggle={toggleSound} />
        </div>
        <img
          src="/images/settings/speaker.svg"
          alt="효과음 켜기"
          className={`${
            isSoundOn
              ? 'filter-none'
              : 'filter-grayscale  opacity-20 transition-all duration-300'
          }`}
        />
      </div>
      <div className="flex items-center mb-[10px]">
        <img src="/images/settings/gear.svg" alt="이미지" />
        <span className="text-2xl font-bold ml-1 mr-3">카메라 좌우 반전</span>
        <ToggleButton isOn={isFlipped} onToggle={toggleFlip} />
      </div>
    </div>
  );
};
export default Settings;
