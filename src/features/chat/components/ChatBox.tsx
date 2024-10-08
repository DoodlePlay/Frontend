'use client';

import React, { useEffect, useRef, useState } from 'react';

import Button from '../../../components/Button/Button';
import ChatBubble from './ChatBubble';

interface ChatMessage {
  id: number;
  userId: string;
  message: string;
}

const ChatBox: React.FC = () => {
  const currentUserId = 'user124';
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      const newMessage: ChatMessage = {
        id: messages.length + 1,
        userId: currentUserId,
        message: inputValue,
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }

    if (chatInputRef.current) {
      chatInputRef.current.focus();
    }
  }, [messages]);

  return (
    <div className="relative flex flex-col w-full h-[240px] p-5 bg-neutral-100 border-[3px] border-black rounded-[10px] shadow-board">
      <div
        className="flex flex-col gap-1 overflow-y-scroll scrollbar-hide pb-[74px]"
        ref={chatContainerRef}
      >
        {messages.map(msg => (
          <ChatBubble
            key={msg.id}
            nickname={msg.userId}
            message={msg.message}
            isCurrentUser={msg.userId === currentUserId}
          />
        ))}
      </div>

      <div className="absolute bottom-5 left-5 right-5 px-5 py-[10px] flex gap-5 items-center bg-white rounded-[10px]">
        <input
          className="flex-grow focus:outline-none font-bold"
          type="text"
          placeholder="정답을 입력해주세요."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyUp={onKeyUp}
          ref={chatInputRef}
        />
        <Button
          text="Enter"
          color="primary"
          onClick={() => {
            if (inputValue.trim()) {
              console.log(inputValue);
              setInputValue('');
            }
          }}
          className="w-[94px] h-[29px] text-[20px] line- rounded-[5px] border-[2px] leading-6"
        />
      </div>
    </div>
  );
};
export default ChatBox;
