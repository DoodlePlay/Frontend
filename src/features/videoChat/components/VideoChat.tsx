'use client';

import { useEffect, useState } from 'react';

import useSocketStore from '../../socket/socketStore';
import PlayingVideoChat from './PlayingVideoChat';
import WaitingVideoChat from './WaitingVideoChat';
import useWebRTC from './hooks/useWebRTC';
import useUserInfoStore from '../../profile/store/userInfoStore';

const VideoChat = () => {
  const { gameState, socket, roomId } = useSocketStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const { isVideoOn } = useUserInfoStore();

  // useWebRTC 훅 사용하여 WebRTC 연결 및 스트림 관리
  const { localStream, remoteStreams, initiateCall } = useWebRTC(roomId);

  useEffect(() => {
    if (!gameState) return;

    if (
      gameState.gameStatus === 'waiting' ||
      gameState.gameStatus === 'gameOver'
    ) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  }, [gameState]);

  useEffect(() => {
    if (socket && gameState) {
      // 참가자 목록을 통해 WebRTC 연결 시작
      Object.keys(gameState.participants || {}).forEach(userId => {
        if (userId !== socket.id) {
          initiateCall(userId);
        }
      });
    }
  }, []); // 방에 처음 입장할 때만 한 번 실행

  return (
    <div className="p-[10px] overflow-hidden">
      {isPlaying ? (
        <PlayingVideoChat />
      ) : (
        <WaitingVideoChat
          localStream={localStream}
          remoteStreams={remoteStreams}
        />
      )}
    </div>
  );
};

export default VideoChat;
