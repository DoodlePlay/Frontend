'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import ChatBubble from './ChatBubble';
import useUserInfoStore from '../../profile/store/userInfoStore';
import useSocketStore from '../../socket/socketStore';

interface ChatMessage {
  nickname: string;
  message: string;
  socketId?: string;
  isSystemMessage?: boolean;
  isPrivateCorrectMessage?: boolean;
  isCorrectMessage?: boolean;
  isRoundMessage?: boolean;
  isAnnounceAnswer?: boolean;
  isItemMessage?: boolean;
}

const ChatBox: React.FC = () => {
  const router = useRouter();
  const { nickname } = useUserInfoStore();
  const { socket, roomId, disconnectSocket, gameState } = useSocketStore();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() && socket) {
      const newMessage: ChatMessage = {
        nickname,
        message: inputValue,
      };

      if (gameState?.items.phantomReverse.status) {
        newMessage.message = newMessage.message.split('').reverse().join('');
      }

      socket.emit('sendMessage', roomId, newMessage);

      setInputValue('');
    }
  };

  const onSendMessage = () => {
    if (inputValue.trim() && socket) {
      const newMessage: ChatMessage = {
        nickname,
        message: inputValue,
      };

      if (gameState?.items.phantomReverse.status) {
        newMessage.message = newMessage.message.split('').reverse().join('');
      }

      socket.emit('sendMessage', roomId, newMessage);

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

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (message: ChatMessage) => {
        setMessages(prevMessages => [...prevMessages, message]);
      });

      socket.on('userJoined', (joinedNickname: string) => {
        setMessages(prevMessages => [
          ...prevMessages,
          {
            nickname: 'System',
            message: `🙌 ${joinedNickname}님이 방에 입장했습니다 🙌`,
            isSystemMessage: true,
          },
        ]);
      });

      socket.on('userLeft', (leftNickname: string) => {
        setMessages(prevMessages => [
          ...prevMessages,
          {
            nickname: 'System',
            message: `👋 ${leftNickname}님이 방에서 퇴장했습니다 👋`,
            isSystemMessage: true,
          },
        ]);
      });

      socket.on('roundProcess', (message: ChatMessage) => {
        setMessages(prevMessages => [...prevMessages, message]);
      });
      socket.on('privateMessage', (message: ChatMessage) => {
        setMessages(prevMessages => [...prevMessages, message]);
      });
      socket.on('closeAnswer', (message: ChatMessage) => {
        setMessages(prevMessages => [...prevMessages, message]);
      });
      socket.on('adaptiveScore', (message: ChatMessage) => {
        setMessages(prevMessages => [...prevMessages, message]);
      });
      socket.on('correctAnswer', (message: ChatMessage) => {
        setMessages(prevMessages => [...prevMessages, message]);
      });
      socket.on('announceAnswer', (message: ChatMessage) => {
        setMessages(prevMessages => [...prevMessages, message]);
      });
      socket.on('cheating', (message: ChatMessage) => {
        setMessages(prevMessages => [...prevMessages, message]);
      });
      socket.on('itemMessage', (message: ChatMessage) => {
        setMessages(prevMessages => [...prevMessages, message]);
      });
    }

    return () => {
      if (socket) {
        socket.off('newMessage');
        socket.off('userJoined');
        socket.off('userLeft');
        socket.off('privateMessage');
        socket.off('roundProcess');
        socket.off('correctAnswer');
        socket.off('adaptiveScore');
        socket.off('closeAnswer');
        socket.off('cheating');
        socket.off('announceAnswer');
        socket.off('itemMessage');
      }
    };
  }, [socket, gameState]);

  const handleDisconnect = () => {
    disconnectSocket();
    router.replace('/room');
  };

  useEffect(() => {
    history.pushState(null, '', '');
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', handleDisconnect);

    return () => {
      window.removeEventListener('popstate', handleDisconnect);
    };
  }, []);

  return (
    <div className="relative flex flex-col h-[240px] p-5 bg-neutral-100 border-[3px] border-black rounded-[10px] shadow-board">
      <div
        className="flex flex-col gap-1 overflow-y-scroll scrollbar-hide pb-[74px]"
        ref={chatContainerRef}
      >
        {messages.map((msg, idx) => (
          <ChatBubble
            key={idx + 1}
            nickname={msg.nickname}
            message={msg.message}
            isCurrentUser={msg.socketId === socket?.id}
            isSystemMessage={msg.isSystemMessage}
            isPrivateCorrectMessage={msg.isPrivateCorrectMessage}
            isCorrectMessage={msg.isCorrectMessage}
            isRoundMessage={msg.isRoundMessage}
            isAnnounceAnswer={msg.isAnnounceAnswer}
            isItemMessage={msg.isItemMessage}
          />
        ))}
      </div>

      <div className="absolute bottom-5 left-5 right-5 px-5 py-[9px] flex gap-5 items-center bg-white rounded-[10px]">
        <input
          className="flex-grow focus:outline-none font-bold"
          type="text"
          placeholder="정답을 입력해주세요."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyUp={onKeyUp}
          ref={chatInputRef}
        />
        <button
          onClick={onSendMessage}
          className="w-[94px] h-[31px] text-[20px] font-cherry rounded-[5px] border-[2px] border-black bg-primary-default hover:bg-primary-600 text-secondary-default leading-6 drop-shadow-button"
          style={{
            textShadow:
              '2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white',
          }}
        >
          Enter
        </button>
      </div>
    </div>
  );
};
export default ChatBox;
