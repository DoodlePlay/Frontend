import ChatBox from '../../features/chat/components/ChatBox';

const ChatPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-dvh overflow-hidden scrollbar-hide">
      <div className="flex w-full max-w-[1240px] gap-[40px]">
        <div className="flex flex-col left w-full gap-y-[20px]">
          <div>Drawing</div>
          <ChatBox />
        </div>
        <div className="flex flex-col right w-full max-w-[420px] gap-y-[20px]">
          <div className="w-full h-full bg-disabled border-[4px] border-black rounded-[10px]">
            avatar
          </div>
          <div className="flex flex-col w-full gap-y-[20px]">
            <div>ItemBox</div>
            <div>GameControlButtons</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
