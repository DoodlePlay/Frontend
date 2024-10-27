import React from 'react';

interface ChatBubbleProps {
  nickname: string;
  message: string;
  isCurrentUser: boolean;
  isSystemMessage?: boolean;
  isScoreMessage?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  nickname,
  isCurrentUser,
  isSystemMessage = false,
  isScoreMessage = false,
}) => {
  if (isSystemMessage) {
    return (
      <div className="text-center text-sm italic text-neutral-default my-2">
        {message}
      </div>
    );
  }

  if (isScoreMessage) {
    return (
      <div
        className={`flex items-start ${
          isCurrentUser ? 'flex-row-reverse' : ''
        }`}
      >
        <div className="text-red-600 text-sm font-bold">{message}</div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-4 ${
        isCurrentUser ? 'flex-row-reverse' : ''
      }`}
    >
      <div className="font-bold">{nickname}</div>

      <div
        className={`relative ${
          isCurrentUser ? 'bg-primary-default' : 'bg-secondary-200'
        } rounded-[3px] px-[10px] py-2 max-w-80 w-fit`}
      >
        {message}
        <div
          className={`absolute top-1/2 w-0 h-0 border-t-[7px] border-b-[7px] ${
            isCurrentUser
              ? 'border-l-[7px] border-transparent border-l-[#ffc700] right-0 mr-[-6px]'
              : 'border-r-[7px] border-transparent border-r-[#BBE6BB] left-0 ml-[-6px]'
          } translate-y-[-50%]`}
        ></div>
      </div>
    </div>
  );
};

export default ChatBubble;
