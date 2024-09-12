import Avatar from '../components/Avatar/Avatar';
import Settings from '../components/Settings/Settings';

const HomePage = () => {
  return (
    <>
      <div className="text-black">Profile Setting Page</div>
      <div className="flex justify-center w-screen mt-20">
        <Avatar src="/images/avatars/man-1.svg" size="large" />
      </div>
      <div className="flex justify-center w-screen mt-20">
        <div className="bg-white">
          <Settings />
        </div>
      </div>
    </>
  );
};

export default HomePage;
