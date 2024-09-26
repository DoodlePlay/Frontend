import React from 'react';

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
  return (
    <div className="min-w-[100px] flex-shrink flex items-center justify-center bg-white rounded-[5px] shadow-lg max-w-xs p-[5px] border-2 border-neutral-default">
      <div
        className={`border-2 border-primary-default p-1 flex w-full rounded-[5px] items-center justify-center ${
          isDrawingActive ? `flex-row gap-2.5 px-[8px] py-[5px]` : `flex-col`
        }`}
      >
        <span className={'text-black font-bold  text-[14px]'}>{title}</span>
        {score !== undefined && (
          <span className="text-secondary-default text-base font-bold">
            {score}점
          </span>
        )}
      </div>
    </div>
  );
};

export default NamePlate;
