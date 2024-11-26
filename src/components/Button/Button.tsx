'use client';

import React from 'react';

type ButtonColor = 'primary' | 'secondary' | 'neutral';

interface ButtonProps {
  text: string;
  color: ButtonColor;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
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
> = ({ text, color, onClick, className }) => {
  const baseStyle =
    'text-[34px] leading-9 font-cherry w-full px-5 pb-1.5 rounded-[10px] border-4 border-black drop-shadow-button';

  const validatedColor: ButtonColor = [
    'primary',
    'secondary',
    'neutral',
  ].includes(color)
    ? (color as ButtonColor)
    : 'primary';

  const colorStyle = buttonStyles[validatedColor];
  const strokeStyle = textStrokeStyles[validatedColor];

  return (
    <button
      className={`${baseStyle} ${colorStyle} ${className}`}
      style={strokeStyle}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
