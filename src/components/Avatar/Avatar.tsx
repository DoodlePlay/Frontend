import React from 'react';

interface AvatarProps {
  isVideoOn?: boolean;
  isClicked?: boolean;
  isGamePage?: boolean;
  size?: 'small' | 'medium' | 'large' | 'xLarge';
  src: string;
}

const sizeClasses = {
  small: 'w-[100px] h-[100px]',
  medium: 'w-[160px] h-[160px]',
  large: 'w-[175px] h-[175px]',
  xLarge: 'w-[190px] h-[190px]',
};

const Avatar = ({ isVideoOn = false, isClicked = false, isGamePage = false, size = 'small', src }: AvatarProps) => {
  const backgroundColor = isGamePage ? 'bg-white' : isClicked ? 'bg-primary-default' : 'bg-white';
  return (
    <div
      className={`overflow-hidden outline outline-3 outline-black rounded-full ${sizeClasses[size]} ${backgroundColor}`}
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
