import PlayingVideoChat from './PlayingVideoChat';
import WaitingVideoChat from './WaitingVideoChat';

const VideoChat = () => {
  const state = false;
  return (
    <>
      <div>{state ? <PlayingVideoChat /> : <WaitingVideoChat />}</div>
    </>
  );
};
export default VideoChat;
