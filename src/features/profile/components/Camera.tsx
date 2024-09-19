'use client';

import Avatar from '../../../components/Avatar/Avatar';
import Settings from '../../../components/Settings/Settings';
import useVideoStore from '../store/videoStore';

const Camera = () => {
  const { isVideoOn } = useVideoStore();
  return (
    <div className="flex flex-col items-center pt-[38px] px-[78px] mb-[73px] space-y-[40px] ">
      <h1 className="font-bold text-[32px] mb-[13px]">카메라 설정</h1>
      <Avatar
        src="/images/avatars/man-1.svg"
        isMyCharacter
        size="large"
        isVideoOn={isVideoOn}
      />
      <Settings />
    </div>
  );
};
export default Camera;
