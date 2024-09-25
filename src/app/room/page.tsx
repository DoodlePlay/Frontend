'use client';

import Button from '../../components/Button/Button';
import RefreshButton from '../../features/lobby/components/RefreshButton';
import RoomList from '../../features/lobby/components/RoomList';
import SearchBar from '../../features/lobby/components/SearchBar';

const LobbyPage = () => {
  const onRefreshRoomList = async () => {
    // RoomList를 새로 가져오는 비동기 작업
    await new Promise(resolve => setTimeout(resolve, 3000)); // 3초 동안 지연
  };

  return (
    <div className="flex gap-10 w-[1200px] mt-[51px] p-[30px] rounded-[20px] bg-white shadow-board mx-auto">
      <div className="flex flex-col gap-10 w-[720px]">
        <div className="flex gap-5 items-center justify-between">
          <SearchBar />
          <RefreshButton onClick={onRefreshRoomList} />
        </div>
        <RoomList />
      </div>
      <div className="flex flex-col gap-10 w-[380px]">
        <Button
          text="Create"
          color="primary"
          onClick={() => {}}
          className="h-[60px]"
        />
        {/* 도형님 수정 필요 */}
        <div className="p-[30px] rounded-[10px] border-4 border-black h-[440px]">
          User Box
        </div>
      </div>
    </div>
  );
};
export default LobbyPage;
