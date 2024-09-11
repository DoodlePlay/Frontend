import React from 'react';

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

const Avatar = ({ isVideoOn = false, isClicked = false, isMyCharacter = false, size = 'small', src }: AvatarProps) => {
  return (
    <div
      className={`overflow-hidden outline outline-3 outline-black rounded-full ${sizeClasses[size]} ${
        isMyCharacter || isClicked ? 'bg-primary-default' : 'bg-white'
      }`}
    >
      {isVideoOn ? (
        <video role="video"></video>
      ) : (
        <img src={src} alt="Avatar" className="w-full h-full object-cover scale-110 translate-y-3" />
      )}
    </div>
  );
};
export default Avatar;
