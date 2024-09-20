import Toolbar from '../../features/drawing/components/Toolbar';

const GamePage = () => {
  return (
    <div className="flex items-center justify-center min-h-dvh">
      <div className="flex w-full max-w-[1240px] gap-[40px]">
        <div className="left w-full">
          <div className="bg-white max-w-[780px] min-h-[630px] w-full h-full relative p-[20px] rounded-[10px] border-[4px] border-black">
            <h1 className="absolute left-0 right-0 top-0 -translate-y-1/2 m-auto">
              <img
                className="m-auto"
                src="/images/Logo.svg"
                alt="Logo"
                loading="lazy"
              />
            </h1>
            <Toolbar />
          </div>
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
