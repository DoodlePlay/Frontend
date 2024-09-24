import Drawing from '../../features/drawing/components/Drawing';

const GamePage = () => {
  return (
    <div className="flex items-center justify-center min-h-dvh">
      <div className="flex w-full max-w-[1240px] gap-[40px]">
        <div className="left w-full">
          <Drawing />
          <div>chat</div>
        </div>
        <div className="right w-full flex-1">
          <div className="bg-black w-full h-full">avatar</div>
          <div className="w-full">items</div>
        </div>
      </div>
    </div>
  );
};
export default GamePage;
