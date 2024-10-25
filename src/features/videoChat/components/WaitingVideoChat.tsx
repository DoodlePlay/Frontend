// 'use client';

// import { useEffect, useState } from 'react';
// import NamePlate from '../../../components/NamePlate/NamePlate';
// import { Avatars } from '../../profile/components/Nickname';
// import useUserInfoStore from '../../profile/store/userInfoStore';
// import useSocketStore from '../../socket/socketStore';
// import RtcAvatar from './RtcAvatar';

// const WaitingVideoChat = ({ localStream, remoteStreams }) => {
//   const [order, setOrder] = useState([]);
//   const { nickname, isVideoOn } = useUserInfoStore();
//   const gameState = useSocketStore(state => state.gameState);

//   useEffect(() => {
//     setOrder(gameState.order);
//   }, [gameState]);

//   return (
//     <div className="grid grid-cols-2 grid-rows-3 gap-y-[10px]">
//       {order.map((userId, index) => (
//         <div key={index} className="flex flex-col justify-center items-center">
//           <RtcAvatar
//             src={Avatars[gameState.participants[userId].clickedAvatarIndex].src}
//             size="waiting"
//             isMyCharacter={gameState.participants[userId].nickname === nickname}
//             isVideoOn={isVideoOn}
//             stream={
//               gameState.participants[userId].nickname === nickname
//                 ? localStream
//                 : remoteStreams[index]
//             }
//           />
//           <NamePlate
//             title={gameState.participants[userId].nickname}
//             score={gameState.participants[userId].score}
//             isWaiting
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default WaitingVideoChat;

'use client';

import { Avatars } from '../../profile/components/Nickname';
import { useEffect, useState } from 'react';
import useUserInfoStore from '../../profile/store/userInfoStore';
import useSocketStore from '../../socket/socketStore';
import RtcAvatar from './RtcAvatar'; // 비디오 스트림을 표시할 컴포넌트
import NamePlate from '../../../components/NamePlate/NamePlate';

const WaitingVideoChat = () => {
  const { nickname } = useUserInfoStore();
  const socket = useSocketStore(state => state.socket);
  const gameState = useSocketStore(state => state.gameState);
  const roomId = useSocketStore(state => state.roomId);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]); // 빈 배열로 초기화
  const { isVideoOn } = useUserInfoStore();
  const [order, setOrder] = useState<string[]>([]);
  let myPeerConnection: RTCPeerConnection | null = null;

  // 게임 상태가 변경되면 order 업데이트
  useEffect(() => {
    setOrder(gameState.order);
  }, [gameState]);

  // 미디어 스트림 시작 및 WebRTC 연결 설정
  async function startMedia() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true, // 비디오 사용
      });
      setLocalStream(stream); // 로컬 스트림 저장
      makeConnection(stream); // WebRTC 연결 설정에 스트림 추가
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  }

  // WebRTC 연결 설정 및 스트림 추가
  function makeConnection(stream: MediaStream) {
    myPeerConnection = new RTCPeerConnection();

    myPeerConnection.addEventListener('icecandidate', handleIce);

    // ontrack 이벤트 핸들러 추가
    myPeerConnection.ontrack = event => {
      const remoteStream = event.streams[0];
      if (remoteStream) {
        setRemoteStreams(prev => [...prev, remoteStream]); // 원격 스트림 추가
      } else {
        console.error('Received an empty stream!');
      }
    };

    // 로컬 스트림의 트랙을 피어 연결에 추가
    stream
      .getTracks()
      .forEach(track => myPeerConnection!.addTrack(track, stream));
  }

  // ICE 후보자를 처리하는 함수
  function handleIce(event: RTCPeerConnectionIceEvent) {
    if (event.candidate) {
      socket.emit('ice', event.candidate, roomId);
    }
  }

  // WebRTC 연결 및 소켓 통신 초기화
  useEffect(() => {
    if (!socket) return; // 소켓이 초기화되지 않았으면 아무 작업도 하지 않음

    async function ConnectRTC() {
      await startMedia(); // 미디어 시작
      socket.emit('connectRTC', roomId); // 서버에 RTC 연결 시작 알림
    }

    ConnectRTC(); // RTC 연결 함수 실행

    // 소켓 이벤트 리스너 설정
    socket.on('welcome', async () => {
      if (!myPeerConnection) return;
      const offer = await myPeerConnection.createOffer();
      await myPeerConnection.setLocalDescription(offer);
      console.log('sent the offer');
      socket.emit('offer', offer, roomId);
    });

    socket.on('offer', async offer => {
      if (!myPeerConnection) return;
      await myPeerConnection.setRemoteDescription(offer);
      const answer = await myPeerConnection.createAnswer();
      await myPeerConnection.setLocalDescription(answer);
      socket.emit('answer', answer, roomId);
      console.log('sent the answer');
    });

    socket.on('answer', async answer => {
      if (!myPeerConnection) return;
      console.log('received the answer');
      await myPeerConnection.setRemoteDescription(answer);
    });

    socket.on('ice', async ice => {
      if (!myPeerConnection) return;
      console.log('received the candidate');
      await myPeerConnection.addIceCandidate(ice);
    });

    return () => {
      socket.off('welcome');
      socket.off('offer');
      socket.off('answer');
      socket.off('ice');
    };
  }, [socket, roomId]); // socket 및 roomId가 준비된 후에 실행

  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-y-[10px]">
      {order.map((userId, index) => (
        <div key={index} className="flex flex-col justify-center items-center">
          <RtcAvatar
            src={Avatars[gameState.participants[userId].clickedAvatarIndex].src}
            size="waiting"
            isMyCharacter={gameState.participants[userId].nickname === nickname}
            isVideoOn={isVideoOn}
            stream={
              gameState.participants[userId].nickname === nickname
                ? localStream
                : remoteStreams[0]
            }
          />
          <NamePlate
            title={gameState.participants[userId].nickname}
            score={gameState.participants[userId].score}
            isWaiting
          />
        </div>
      ))}
    </div>
  );
};

export default WaitingVideoChat;
