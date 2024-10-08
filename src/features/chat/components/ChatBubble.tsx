interface ChatBubbleProps {
  nickname: string;
  message: string;
  isCurrentUser: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  nickname,
  message,
  isCurrentUser,
}) => {
  return (
    <div
      className={`flex items-center ${
        isCurrentUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {isCurrentUser ? <div>message + 이름</div> : <div>이름 + message</div>}

      {/* 화살표 */}
      <div
        className={`relative p-2 bg-${
          isCurrentUser ? 'blue' : 'gray'
        }-200 rounded-lg text-${isCurrentUser ? 'right' : 'left'} max-w-[70%]`}
      >
        {message}
        <span
          className={`absolute ${
            isCurrentUser ? 'right-full' : 'left-full'
          } top-1/2 transform -translate-y-1/2`}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <polygon
              points={isCurrentUser ? '10,5 0,0 0,10' : '0,5 10,0 10,10'}
              fill={isCurrentUser ? '#3B82F6' : '#D1D5DB'}
            />
          </svg>
        </span>
      </div>
      <div className={`ml-2 text-${isCurrentUser ? 'right' : 'left'}`}>
        <span className="font-bold">{nickname}</span>
      </div>
    </div>
  );
};

export default ChatBubble;
