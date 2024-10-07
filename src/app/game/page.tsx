import Drawing from '../../features/drawing/components/Drawing';
import GameControlButtons from '../../features/drawing/components/GameControlButtons';
import ItemBox from '../../features/drawing/components/ItemBox';

const GamePage = () => {
  return (
    <div className="flex items-center justify-center min-h-dvh overflow-hidden scrollbar-hide">
      <div className="flex w-full max-w-[1240px] gap-[40px]">
        <div className="flex flex-col left w-full gap-y-[20px]">
          <Drawing />
          <div className="w-full h-[240px] bg-disabled border-[4px] border-black rounded-[10px]">
            chat
          </div>
        </div>
        <div className="flex flex-col right w-full max-w-[420px] gap-y-[20px]">
          <div className="w-full h-full bg-disabled border-[4px] border-black rounded-[10px]">
            avatar
          </div>
          <div className="flex flex-col w-full gap-y-[20px]">
            <ItemBox />
            <GameControlButtons />
          </div>
        </div>
      </div>
    </div>
  );
};
export default GamePage;
