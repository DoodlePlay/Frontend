'use client';

import React, { useEffect, useRef, useState } from 'react';

import useUserInfoStore from '../../features/profile/store/userInfoStore';
import Resize from '../../hooks/Resize/Resize';

interface AvatarProps {
  isVideoOn?: boolean;
  isClicked?: boolean;
  isMyCharacter?: boolean;
  size?: 'small' | 'waiting' | 'medium' | 'large';
  src: string;
  className?: string;
}

const sizeClasses = {
  small: 'w-[100px] h-[100px]',
  waiting: 'w-[145px] h-[145px]',
  medium: 'w-[160px] h-[160px]',
  large: 'w-[190px] h-[190px]',
};

const Avatar = ({
  isVideoOn = false,
  isClicked = false,
  isMyCharacter = false,
  size = 'small',
  src,
  className = '',
}: AvatarProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { isFlipped, toggleVideo } = useUserInfoStore();

  // 연결된 카메라 장치가 있는지 확인
  const checkCameraConnected = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput');

    // 가상 카메라의 키워드를 이용해서 필터링
    const physicalCameras = videoDevices.filter(device => {
      const label = device.label.toLowerCase();
      return (
        !label.includes('virtual') &&
        !label.includes('obs') &&
        !label.includes('youcam') &&
        !label.includes('snap') &&
        !label.includes('manycam') &&
        !label.includes('xsplit') &&
        !label.includes('camtwist') &&
        !label.includes('droidcam') &&
        !label.includes('epoccam') &&
        !label.includes('sparkocam')
      );
    });
    return physicalCameras.length > 0;
  };

  useEffect(() => {
    const setupVideoStream = async () => {
      const hasCamera = await checkCameraConnected();
      if (!hasCamera) {
        if (isVideoOn) {
          setTimeout(() => {
            toggleVideo();
          }, 500); // 자연스러운 토글액션을 위한 0.5초의 간격
        }
        return;
      }

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
    };

    setupVideoStream();
  }, [isVideoOn]);

  const length = Resize();
  return (
    <div
      className={`overflow-hidden outline outline-3 outline-black  rounded-full ${
        sizeClasses[size]
      } ${
        isMyCharacter || isClicked ? 'bg-primary-default' : 'bg-white'
      } ${className} `}
      style={
        //뷰포트의 크기가 1000px보다 작을 때 아바타의 w, h를 동적으로 조젋
        size === 'small'
          ? { width: `${length}px`, height: `${length}px` }
          : size === 'waiting'
          ? { width: `${length * 1.4}px`, height: `${length * 1.4}px` }
          : size === 'medium'
          ? { width: `160px`, height: `160px` }
          : { width: `${Math.min(length * 2)}px`, height: `${length * 2}px` }
      }
    >
      {isVideoOn ? (
        <div className="w-full h-full object-cover scale-[1.12] translate-y-[8px] bg-webCam bg-cover bg-center bg-white">
          <video
            ref={videoRef}
            role="video"
            className={`w-full h-full object-cover ${
              isFlipped ? 'transform scale-x-[-1]' : ''
            }`}
          />
        </div>
      ) : (
        <img
          src={src}
          alt="Avatar"
          draggable="false"
          className="w-full h-full object-cover scale-[1.12] translate-y-[8px]"
        />
      )}
    </div>
  );
};

export default Avatar;
