import CreateRoomButton from '../../features/lobby/components/CreateRoomButton';
import RoomSearchSection from '../../features/lobby/components/RoomSearchSection';
import { getRooms } from '../../features/lobby/api/gameRoomsApi';
import UserProfileSection from '../../features/lobby/components/UserProfileSection';

const LobbyPage: React.FC = async () => {
  const rooms = await getRooms();

  return (
    <div className="flex gap-10 w-[1200px] mt-[51px] p-[30px] rounded-[20px] bg-white shadow-board mx-auto">
      <RoomSearchSection rooms={rooms} />
      <div className="flex flex-col gap-10 w-[380px]">
        <CreateRoomButton />
        <div className="py-[30px] rounded-[10px] border-4 border-black h-[440px]">
          <UserProfileSection />
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;
