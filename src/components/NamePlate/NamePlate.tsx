'use client';

import React, { useEffect, useState } from 'react';
import Resize from '../../hooks/Resize/Resize';

interface NamePlateProps {
  title: string;
  isDrawingActive?: boolean;
  score?: number; // 점수가 있는 경우, 옵션으로 표시
}

const NamePlate: React.FC<NamePlateProps> = ({
  title,
  score,
  isDrawingActive,
}) => {
  const length = Resize();

  return (
    <div
      className={`flex items-center justify-center bg-white rounded-[5px] drop-shadow-namePlate max-w-xs p-[5px] border-2 border-neutral-default`}
      style={
        isDrawingActive
          ? { width: `${length * 2}px`, height: `${length * 0.6}px` }
          : { width: `${length}px`, height: `${length * 0.7}px` }
      }
    >
      <div
        className={`border-2 border-primary-default p-1 flex rounded-[5px] items-center justify-center ${
          isDrawingActive
            ? `flex-row w-[200px] gap-2.5 px-[8px] py-[5px]`
            : `flex-col`
        }`}
        style={
          isDrawingActive
            ? {
                width: `${length * 2}px`,
                height: `${length * 0.45}px`,
              }
            : {
                width: `${length}px`,
                height: `${length * 0.56}px`,
              }
        }
      >
        <span
          className={`text-black font-bold ${
            window.innerHeight < 800 ? 'text-[10px]' : 'text-[14px]'
          } text-ellipsis whitespace-nowrap`}
        >
          {title}
        </span>
        {score !== undefined && (
          <span
            className={`text-secondary-default ${
              window.innerHeight < 800 ? 'text-[10px]' : 'text-[14px]'
            } font-bold`}
          >
            {score}점
          </span>
        )}
      </div>
    </div>
  );
};

export default NamePlate;
