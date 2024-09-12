import Avatar from '../../../components/Avatar/Avatar';
import Settings from '../../../components/Settings/Settings';

const Camera = () => {
  return (
    <div className="flex flex-col w-1/2 items-center pt-[38px] px-[78px] mb-[73px] space-y-[40px] ">
      <h1 className="font-bold text-[32px] mb-[13px]">카메라 설정</h1>
      <Avatar src="/images/avatars/man-1.svg" isMyCharacter size="large" />
      <Settings />
    </div>
  );
};
export default Camera;
