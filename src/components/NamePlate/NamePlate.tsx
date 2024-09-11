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
    <div className="flex items-center justify-center bg-white rounded-[5px] shadow-lg max-w-xs p-[5px] border-2 border-neutral-default">
      <div
        className={`border-2 border-primary-default p-2 flex w-full rounded-[5px] items-center justify-center ${
          isDrawingActive ? `flex-row gap-2.5 py-[5px]` : `flex-col py-[10px]`
        }`}
      >
        <span
          className={`text-black font-bold ${score ? 'text-base' : 'text-4xl'}`}
        >
          {title}
        </span>
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
