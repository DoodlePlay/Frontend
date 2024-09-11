import Avatar from '../components/Avatar/Avatar';
import Settings from '../components/Settings/Settings';

const HomePage = () => {
  return (
    <>
      <div className="text-black">Profile Setting Page</div>
      <div className="flex justify-center w-screen mt-32">
        <Avatar src="/images/avatars/man-1.svg" size="w-[175px] h-[175px]" />
        <div className="bg-white">
          <Settings />
        </div>
      </div>
    </>
  );
};

export default HomePage;
