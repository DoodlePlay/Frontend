'use client';

import React, { useEffect, useRef } from 'react';

import useFlipStore from '../../features/profile/store/flipStore';

interface AvatarProps {
  isVideoOn?: boolean;
  isClicked?: boolean;
  isMyCharacter?: boolean;
  size?: 'small' | 'medium' | 'large' | 'xLarge';
  src: string;
}

const sizeClasses = {
  small: 'w-[100px] h-[100px]',
  medium: 'w-[160px] h-[160px]',
  large: 'w-[190px] h-[190px]',
};

const Avatar = ({
  isVideoOn = false,
  isClicked = false,
  isMyCharacter = false,
  size = 'small',
  src,
}: AvatarProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const { isFlipped } = useFlipStore();
  useEffect(() => {
    if (isVideoOn && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => {
          streamRef.current = stream;
          videoRef.current!.srcObject = stream;
          videoRef.current!.play();
        })
        .catch(err => {
          console.error('Error accessing webcam: ', err);
        });
    } else {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach(track => track.stop());
        streamRef.current = null;
      }
    }
  }, [isVideoOn]);

  return (
    <div
      className={`overflow-hidden outline outline-3 outline-black rounded-full ${
        sizeClasses[size]
      } ${isMyCharacter || isClicked ? 'bg-primary-default' : 'bg-white'}`}
    >
      {isVideoOn ? (
        <video
          ref={videoRef}
          role="video"
          className={`w-full h-full object-cover ${
            isFlipped ? 'transform scale-x-[-1]' : ''
          }`}
        />
      ) : (
        <img
          src={src}
          alt="Avatar"
          className="w-full h-full object-cover scale-110 translate-y-3"
        />
      )}
    </div>
  );
};

export default Avatar;
