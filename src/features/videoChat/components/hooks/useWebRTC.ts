import { useEffect, useRef, useState } from 'react';
import useSocketStore from '../../../socket/socketStore';
import useUserInfoStore from '../../../profile/store/userInfoStore';

const useWebRTC = roomId => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState({});
  const peerConnections = useRef({});
  const socket = useSocketStore(state => state.socket);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(stream => {
        setLocalStream(stream);
      })
      .catch(err => console.error('Error accessing media devices:', err));
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Offer 수신 시 처리
    socket.on('offer', async (offer, fromUserId) => {
      console.log(`Received offer from ${fromUserId}`);
      const peerConnection = createPeerConnection(fromUserId);

      console.log(
        `Signaling state before setting offer: ${peerConnection.signalingState}`
      );

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
        console.log(
          `Skipping answer creation: signaling state is ${peerConnection.signalingState}`
        );
      }
    });

    // Answer 수신 시 처리
    socket.on('answer', async (answer, fromUserId) => {
      const peerConnection = peerConnections.current[fromUserId];
      if (
        peerConnection &&
        peerConnection.signalingState === 'have-local-offer'
      ) {
        try {
          await peerConnection.setRemoteDescription(
            new RTCSessionDescription(answer)
          );
        } catch (error) {
          console.error('Failed to set remote description for answer:', error);
        }
      }
    });

    // ICE 후보자 수신 시 처리
    socket.on('ice-candidate', async (candidate, fromUserId) => {
      const peerConnection = peerConnections.current[fromUserId];
      if (peerConnection) {
        console.log(`Adding ICE candidate from ${fromUserId}`);
        await peerConnection
          .addIceCandidate(new RTCIceCandidate(candidate))
          .catch(error => {
            console.error('Error adding received ICE candidate:', error);
          });
      }
    });

    return () => {
      socket.off('offer');
      socket.off('answer');
      socket.off('ice-candidate');
    };
  }, [socket]);

  // PeerConnection 생성
  const createPeerConnection = userId => {
    if (peerConnections.current[userId]) return peerConnections.current[userId];

    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
        { urls: 'stun:stun3.l.google.com:19302' },
        { urls: 'stun:stun4.l.google.com:19302' },
      ],
    });

    if (localStream) {
      localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
    }

    pc.onicecandidate = event => {
      if (event.candidate) {
        console.log(`Sending ICE candidate to ${userId}`);
        socket.emit('ice-candidate', event.candidate, roomId, userId);
      } else {
        console.log('All ICE candidates have been sent');
      }
    };

    pc.ontrack = event => {
      const remoteStream = event.streams[0];
      setRemoteStreams(prev => ({
        ...prev,
        [userId]: remoteStream,
      }));
    };

    peerConnections.current[userId] = pc;
    return pc;
  };

  const initiateCall = async userId => {
    if (userId === socket.id) return;

    const peerConnection = createPeerConnection(userId);
    if (peerConnection.signalingState === 'stable') {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      socket.emit('offer', offer, roomId, userId);
    }
  };

  return {
    localStream,
    remoteStreams,
    initiateCall,
  };
};

export default useWebRTC;
