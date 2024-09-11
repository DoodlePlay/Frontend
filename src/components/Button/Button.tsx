'use client';

import React from 'react';

type ButtonColor = 'primary' | 'secondary' | 'neutral';

interface ButtonProps {
  text: string;
  color: ButtonColor;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const buttonStyles: Record<ButtonColor, string> = {
  primary: 'bg-primary-default hover:bg-primary-600 text-secondary-default',
  secondary: 'bg-secondary-default hover:bg-secondary-800 text-white',
  neutral: 'bg-disabled hover:bg-neutral-300 text-neutral-default',
};

const textStrokeStyles: Record<ButtonColor, React.CSSProperties> = {
  primary: { WebkitTextStroke: '1px white' },
  secondary: { WebkitTextStroke: '2px #ffc700' },
  neutral: { WebkitTextStroke: '2px white' },
};

const Button: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ text, color, onClick }) => {
  const baseStyle =
    'text-[34px] leading-9 font-cherry w-full px-5 pb-1.5 rounded-[10px] border-4 border-black drop-shadow-button';
  const colorStyle = buttonStyles[color];
  const strokeStyle = textStrokeStyles[color];

  return (
    <button
      className={`${baseStyle} ${colorStyle}`}
      style={strokeStyle}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
