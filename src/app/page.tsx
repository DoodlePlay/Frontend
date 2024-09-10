import Avatar from '../components/Avatar/Avatar';
import Header from '../components/Header/Header';
import Settings from '../components/Settings/Settings';

const HomePage = () => {
  return (
    <>
      <div className="text-black">Profile Setting Page</div>
      <Header />
      <div className="flex justify-center w-screen mt-32">
        <Avatar src="/images/avatars/man-1.svg" size="w-[175px] h-[175px]" />
      </div>
      <div className="flex justify-center w-screen mt-32">
        <div className="bg-white">
          <Settings />
        </div>
      </div>
    </>
  );
};

export default HomePage;
