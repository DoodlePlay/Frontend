'use client';

import React, { useEffect, useRef } from 'react';
import useUserInfoStore from '../../profile/store/userInfoStore';
import Resize from '../../../hooks/Resize/Resize';

interface AvatarProps {
  isVideoOn?: boolean;
  isClicked?: boolean;
  isMyCharacter?: boolean;
  size?: 'small' | 'waiting' | 'medium' | 'large';
  src: string;
  stream?: MediaStream | null; // MediaStream 추가
  className?: string;
}

const sizeClasses = {
  small: 'w-[100px] h-[100px]',
  waiting: 'w-[145px] h-[145px]',
  medium: 'w-[160px] h-[160px]',
  large: 'w-[190px] h-[190px]',
};

const RtcAvatar = ({
  isVideoOn = false,
  isClicked = false,
  isMyCharacter = false,
  size = 'small',
  src,
  stream,
  className = '',
}: AvatarProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { isFlipped } = useUserInfoStore();

  useEffect(() => {
    // stream이 있을 때 비디오 요소에 stream 설정
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      // 약간의 지연을 두고 재생 시도
      setTimeout(() => {
        videoRef.current
          .play()
          .catch(err => console.error('Error playing video:', err));
      }, 100); // 100ms 지연
    }
  }, [stream]);

  const length = Resize();

  return (
    <div
      className={`overflow-hidden outline outline-3 outline-black rounded-full ${
        sizeClasses[size]
      } ${
        isMyCharacter || isClicked ? 'bg-primary-default' : 'bg-white'
      } ${className}`}
      style={
        size === 'small'
          ? { width: `${length}px`, height: `${length}px` }
          : size === 'waiting'
          ? { width: `${length * 1.4}px`, height: `${length * 1.4}px` }
          : size === 'medium'
          ? { width: `160px`, height: `160px` }
          : { width: `${Math.min(length * 2)}px`, height: `${length * 2}px` }
      }
    >
      <video
        ref={videoRef}
        className={`w-full h-full object-cover ${
          isFlipped ? 'transform scale-x-[-1]' : ''
        }`}
        autoPlay
        playsInline
      />
    </div>
  );
};

export default RtcAvatar;
