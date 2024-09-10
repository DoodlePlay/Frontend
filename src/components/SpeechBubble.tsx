import React from 'react';

interface SpeechBubbleProps {
  title?: string;
  children?: string;
  isSelected: boolean;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  title,
  children,
  isSelected,
}) => {
  return (
    <div
      className={
        'mt-3.5 relative bg-white p-4 rounded-lg shadow-md text-center border-2 border-black border-4'
      }
    >
      <div
        className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-b-0 border-r-0 border-black rotate-45"
        style={{ top: '-15px', borderRadius: '4px' }}
      ></div>
      {isSelected ? (
        <div>avatar</div>
      ) : (
        <>
          <h3
            className="text-xl mb-2"
            style={{ fontFamily: 'Cherry Bomb One' }}
          >
            {title}
          </h3>
          <p className="text-gray-600">{children}</p>
        </>
      )}
    </div>
  );
};

export default SpeechBubble;
