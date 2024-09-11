import Button from '../components/Button/Button';

const HomePage = () => {
  return (
    <div className="text-black">
      Profile Setting Page
      <div className="flex flex-col gap-4 w-2/5">
        <Button text="Play" color="primary" />
        <Button text="EXIT" color="secondary" />
        <Button text="No" color="neutral" />
      </div>
    </div>
  );
};

export default HomePage;
