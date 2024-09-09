import NamePlate from '../components/NamePlate';

const HomePage = () => {
  return (
    <div className="text-black">
      Profile Setting Page
      <NamePlate title="test" score={200} drawing />
    </div>
  );
};

export default HomePage;
