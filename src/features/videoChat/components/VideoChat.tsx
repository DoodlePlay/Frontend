// 'use client';

// import { useEffect, useState } from 'react';
// import useSocketStore from '../../socket/socketStore';
// import PlayingVideoChat from './PlayingVideoChat';
// import WaitingVideoChat from './WaitingVideoChat';
// import useWebRTC from './hooks/useWebRTC';

// const VideoChat = () => {
//   const gameState = useSocketStore(state => state.gameState);
//   const socket = useSocketStore(state => state.socket);
//   const roomId = useSocketStore(state => state.roomId);
//   const [state, setState] = useState(false);
//   const { localStream, remoteStreams, initiateCall } = useWebRTC(roomId);

//   // WebRTC 연결을 설정하는 로직을 별도로 작성
//   const setupWebRTCConnections = () => {
//     const participants = Object.keys(gameState.participants);
//     participants.forEach(userId => {
//       if (userId !== socket.id) {
//         initiateCall(userId); // 본인이 아닌 다른 사용자와 연결 시작
//       }
//     });
//   };

//   // 대기 상태에서도 WebRTC 연결을 시작
//   useEffect(() => {
//     if (socket && gameState) {
//       // 게임이 시작하기 전 대기 상태에서 WebRTC 연결 설정
//       setupWebRTCConnections();
//     }
//   }, [socket, gameState]);

//   useEffect(() => {
//     if (socket) {
//       // 게임 시작 이벤트 발생 시
//       socket.on('game started', () => {
//         setState(true);

//         // 게임 시작과 함께 WebRTC 연결 다시 설정 (필요시)
//         setupWebRTCConnections();
//       });

//       return () => {
//         socket.off('game started');
//       };
//     }
//   }, [socket, gameState]);

//   useEffect(() => {
//     // 게임 턴이 0이면 대기 상태로 전환
//     if (gameState.turn === 0) {
//       setState(false);
//     } else {
//       setState(true);
//     }
//   }, [gameState]);

//   return (
//     <div className="p-[10px] overflow-hidden">
//       {state ? (
//         <PlayingVideoChat />
//       ) : (
//         <WaitingVideoChat localStream={localStream} remoteStreams={remoteStreams} />
//       )}
//     </div>
//   );
// };

// export default VideoChat;

'use client';

import { useEffect, useState } from 'react';
import useSocketStore from '../../socket/socketStore';
import PlayingVideoChat from './PlayingVideoChat';
import WaitingVideoChat from './WaitingVideoChat';
import useWebRTC from './hooks/useWebRTC';

const VideoChat = () => {
  const gameState = useSocketStore(state => state.gameState);
  const socket = useSocketStore(state => state.socket);
  const roomId = useSocketStore(state => state.roomId);
  const [state, setState] = useState(false);

  useEffect(() => {
    // 게임 턴이 0이면 대기 상태로 전환
    if (gameState.turn === 0) {
      setState(false);
    } else {
      setState(true);
    }
  }, [gameState]);

  return (
    <div className="p-[10px] overflow-hidden">
      {state ? <PlayingVideoChat /> : <WaitingVideoChat />}
    </div>
  );
};

export default VideoChat;
