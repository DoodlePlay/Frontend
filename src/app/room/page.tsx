import CreateRoomButton from '../../features/lobby/components/CreateRoomButton';
import RoomSearchSection from '../../features/lobby/components/RoomSearchSection';
import UserProfileSection from '../../features/lobby/components/UserProfileSection';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';

const LobbyPage: React.FC = async () => {
  return (
    <ProtectedRoute>
      <div className="flex gap-10 w-[1200px] mt-[51px] p-[30px] rounded-[20px] bg-white shadow-board mx-auto">
        <RoomSearchSection />
        <div className="flex flex-col gap-10 w-[380px]">
          <CreateRoomButton />
          <div className="py-[30px] rounded-[10px] border-4 border-black h-[440px]">
            <UserProfileSection />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default LobbyPage;
