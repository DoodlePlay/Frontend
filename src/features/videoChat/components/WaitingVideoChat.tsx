import { useEffect, useRef, useState } from 'react';
import Avatar from '../../../components/Avatar/Avatar';
import NamePlate from '../../../components/NamePlate/NamePlate';
import { Avatars } from '../../profile/components/Nickname';
import useUserInfoStore from '../../profile/store/userInfoStore';
import useSocketStore from '../../socket/socketStore';
import RtcAvatar from './RtcAvatar';

interface WaitingVideoChatProps {
  localStream: MediaStream | null;
  remoteStreams: { [userId: string]: MediaStream };
}

const WaitingVideoChat: React.FC<WaitingVideoChatProps> = ({
  localStream,
  remoteStreams,
}) => {
  const [order, setOrder] = useState([]);
  const { nickname } = useUserInfoStore();
  const { gameState } = useSocketStore();

  useEffect(() => {
    if (!gameState) return; // socket 또는 gameState가 null인 경우 종료

    setOrder(gameState.order);
  }, [gameState]); // socket, gameState의 변경을 감지하여 useEffect 실행

  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-y-[10px]">
      {order.map(userId => {
        const participant = gameState?.participants[userId];
        if (!participant) return null;

        const isLocalUser = participant.nickname === nickname;
        const stream = isLocalUser ? localStream : remoteStreams[userId];

        return (
          <div key={userId} className="flex justify-center">
            <div>
              <RtcAvatar
                src={Avatars[participant.clickedAvatarIndex].src}
                size="waiting"
                isMyCharacter={isLocalUser}
                stream={stream || null}
              />
              <NamePlate
                title={participant.nickname}
                score={participant.score}
                isWaiting
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WaitingVideoChat;
