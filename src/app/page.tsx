import Avatar from '../components/Avatar/Avatar';
import Settings from '../components/Settings/Settings';
import Camera from '../features/profile/components/Camera';
import Nickname from '../features/profile/components/Nickname';

const HomePage = () => {
  return (
    <div className="flex w-[1000px] mt-[51px] rounded-[20px] bg-white shadow-board mx-auto">
      <Nickname />
      <div className="border-l-2 border-neutral-150 my-[19px] shadow-border"></div>
      <Camera />
    </div>
  );
};

export default HomePage;
