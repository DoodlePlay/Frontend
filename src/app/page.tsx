import NamePlate from '../components/NamePlate';
import SpeechBubble from '../components/SpeechBubble';

const HomePage = () => {
  return (
    <div className="text-black">
      Profile Setting Page
      <NamePlate title="test" score={200} isDrawingActive />
      <NamePlate title="선풍기" />
      <SpeechBubble isAvatarSelected={false} title="Toxic Cover">
        군데군데 독극물을 뿌린다.
      </SpeechBubble>
      <SpeechBubble isAvatarSelected />
    </div>
  );
};

export default HomePage;
