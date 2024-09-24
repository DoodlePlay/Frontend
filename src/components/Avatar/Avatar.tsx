'use client';

import React, { useEffect, useRef } from 'react';

import useUserInfoStore from '../../features/profile/store/userInfoStore';

interface AvatarProps {
  isVideoOn?: boolean;
  isClicked?: boolean;
  isMyCharacter?: boolean;
  size?: 'small' | 'medium' | 'large';
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

  return (
    <div
      className={`overflow-hidden outline outline-3 outline-black rounded-full ${
        sizeClasses[size]
      } ${isMyCharacter || isClicked ? 'bg-primary-default' : 'bg-white'} `}
    >
      {isVideoOn ? (
        <div className="w-full h-full object-cover scale-110 translate-y-[9px] bg-webCam bg-cover bg-center">
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
          className="w-full h-full object-cover scale-110 translate-y-[9px]"
        />
      )}
    </div>
  );
};

export default Avatar;
