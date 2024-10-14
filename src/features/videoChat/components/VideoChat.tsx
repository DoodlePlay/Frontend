import PlayingVideoChat from './PlayingVideoChat';
import WaitingVideoChat from './WaitingVideoChat';

const VideoChat = () => {
  const state = true;

  return (
    <div className="p-[10px] overflow-hidden">
      {state ? <PlayingVideoChat /> : <WaitingVideoChat />}
    </div>
  );
};

export default VideoChat;
