import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import ChatBox from '../../features/chat/components/ChatBox';
import Drawing from '../../features/drawing/components/Drawing';
import GameControlButtons from '../../features/drawing/components/GameControlButtons';
import ItemBox from '../../features/drawing/components/ItemBox';
import VideoChat from '../../features/videoChat/components/VideoChat';

const GamePage = () => {
  return (
    <ProtectedRoute>
      <div className="flex items-center justify-center min-h-dvh overflow-hidden scrollbar-hide">
        <div className="flex w-full max-w-[1240px] gap-[40px]">
          <div className="flex flex-col left w-full gap-y-[20px]">
            <Drawing />
            <ChatBox />
          </div>
          <div className="flex flex-col right w-full max-w-[420px] gap-y-[20px]">
            <div className="w-full rounded-[10px] mb-[10px]">
              <VideoChat />
            </div>
            <div className="flex flex-col w-full gap-y-[20px] mb-[2px]">
              <ItemBox />
              <GameControlButtons />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};
export default GamePage;
