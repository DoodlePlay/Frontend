import { useEffect, useRef, useState } from 'react';
import useSocketStore from '../../../socket/socketStore';
import useUserInfoStore from '../../../profile/store/userInfoStore';

const useWebRTC = (roomId: string) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);
  const peerConnections = useRef<{ [userId: string]: RTCPeerConnection }>({});
  const socket = useSocketStore(state => state.socket);
  const { isVideoOn } = useUserInfoStore();

  useEffect(() => {
    // 로컬 비디오/오디오 스트림 설정
    if (isVideoOn) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(stream => {
          setLocalStream(stream);
        })
        .catch(err => console.error('Error accessing media devices:', err));
    }
  }, [isVideoOn]);

  useEffect(() => {
    if (!socket) return;

    // Offer 받았을 때 처리
    socket.on(
      'offer',
      async (offer: RTCSessionDescriptionInit, fromUserId: string) => {
        const peerConnection = createPeerConnection(fromUserId);

        if (
          peerConnection.signalingState === 'stable' ||
          peerConnection.signalingState === 'have-remote-offer'
        ) {
          await peerConnection.setRemoteDescription(
            new RTCSessionDescription(offer)
          );
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          socket.emit('answer', answer, roomId, fromUserId);
        } else {
          console.error(
            'PeerConnection is not in a valid state to set remote description.'
          );
        }
      }
    );

    // Answer 받았을 때 처리
    socket.on(
      'answer',
      async (answer: RTCSessionDescriptionInit, fromUserId: string) => {
        const peerConnection = peerConnections.current[fromUserId];

        if (peerConnection.signalingState === 'have-local-offer') {
          await peerConnection.setRemoteDescription(
            new RTCSessionDescription(answer)
          );
        } else {
          console.error(
            'PeerConnection is not in a valid state to set remote answer.'
          );
        }
      }
    );

    // ICE 후보자 받았을 때 처리
    socket.on(
      'ice-candidate',
      async (candidate: RTCIceCandidateInit, fromUserId: string) => {
        const peerConnection = peerConnections.current[fromUserId];
        if (peerConnection) {
          await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        }
      }
    );

    return () => {
      socket.off('offer');
      socket.off('answer');
      socket.off('ice-candidate');
    };
  }, [socket]);

  // PeerConnection 생성
  const createPeerConnection = (userId: string) => {
    if (peerConnections.current[userId]) return peerConnections.current[userId];

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    // 로컬 비디오 트랙을 추가
    if (localStream) {
      localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
    }

    pc.onicecandidate = event => {
      if (event.candidate) {
        socket.emit('ice-candidate', event.candidate, roomId, userId);
      }
    };

    pc.ontrack = event => {
      const remoteStream = event.streams[0];
      setRemoteStreams(prev => [...prev, remoteStream]);
    };

    peerConnections.current[userId] = pc;
    return pc;
  };

  // WebRTC 연결 시작 (자기 자신에게 Offer 전송 방지)
  const initiateCall = async (userId: string) => {
    if (userId === socket.id) return; // 자기 자신에게 offer를 보내지 않음

    const peerConnection = createPeerConnection(userId);

    // 현재 signalingState를 확인하여 중복 호출을 방지
    if (peerConnection.signalingState === 'stable') {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      socket.emit('offer', offer, roomId, userId);
    } else {
      console.error(
        'Cannot initiate call, PeerConnection is not in a stable state.'
      );
    }
  };

  return {
    localStream,
    remoteStreams,
    initiateCall,
  };
};

export default useWebRTC;
