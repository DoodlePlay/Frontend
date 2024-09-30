import Drawing from '../../features/drawing/components/Drawing';
import GameControlButtons from '../../features/drawing/components/GameControlButtons';
import ItemBox from '../../features/drawing/components/ItemBox';

const GamePage = () => {
  return (
    <div className="flex items-center justify-center min-h-dvh overflow-hidden tall:mt-0 short:pt-[50px]">
      <div className="flex w-full max-w-[1240px] gap-[40px]">
        <div className="flex flex-col left w-full gap-y-[40px]">
          <Drawing />
          <div>chat</div>
        </div>
        <div className="flex flex-col right w-full max-w-[420px] gap-y-[40px]">
          <div className="bg-black w-full h-full">avatar</div>
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
