'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs';

import Button from '../../../components/Button/Button';
import Modal from '../../../components/Modal/Modal';
import RefreshButton from './RefreshButton';
import SearchBar from './SearchBar';
import GameStatusModal from './GameStatusModal';
import RoomCard from './RoomCard';
import { Room, getRoomById, getRooms, joinRoom } from '../api/gameRoomsApi';

interface RoomSearchSectionProps {
  rooms: Room[];
}

const RoomSearchSection: React.FC<RoomSearchSectionProps> = ({
  rooms: initialRooms,
}) => {
  const router = useRouter();
  const [rooms, setRooms] = useState(initialRooms);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedRoomPassword, setSelectedRoomPassword] = useState<
    string | null
  >(null);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isGameStatusModalOpen, setGameStatusModalOpen] = useState(false);
  const [gameStatusErrorType, setGameStatusErrorType] = useState<
    'full' | 'playing' | null
  >(null);

  const onRefreshRoomList = async () => {
    try {
      const fetchedRooms = await getRooms();
      setRooms(fetchedRooms);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const onFetchRooms = (fetchedRooms: Room[]) => {
    setRooms(fetchedRooms);
  };

  const onClickRoom = async (roomId: string) => {
    try {
      const room = await getRoomById(roomId);

      if (room.gameStatus === 'playing') {
        setGameStatusErrorType('playing');
        setGameStatusModalOpen(true);
        return;
      }

      if (room.currentPlayers >= room.maxPlayers) {
        setGameStatusErrorType('full');
        setGameStatusModalOpen(true);
        return;
      }

      if (!room.isPublic) {
        setSelectedRoom(room.id);
        setSelectedRoomPassword(room.password);
        setPasswordModalOpen(true);
      } else {
        await joinRoom(roomId);
        router.push('/game'); // 추후 roomId 붙은 라우터 수정
      }
    } catch (error) {
      console.error('Error fetching room details:', error);
    }
  };

  const onClosePasswordModal = () => {
    setPasswordModalOpen(false);
    setSelectedRoom(null);
    setSelectedRoomPassword(null);
    setPassword('');
    setPasswordError(null);
  };

  const onCloseGameStatusModal = () => {
    setGameStatusModalOpen(false);
    setGameStatusErrorType(null);
  };

  const onPasswordInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.replace(/[^0-9]/g, '');
    setPassword(value);
    setPasswordError(null);
  };

  const onSubmitPassword = async () => {
    try {
      if (selectedRoomPassword) {
        const isPasswordValid = bcrypt.compareSync(
          password,
          selectedRoomPassword
        );
        if (isPasswordValid) {
          await joinRoom(selectedRoom);
          router.push('/game'); // 추후 roomId 붙은 라우터 수정

          onClosePasswordModal();
        } else {
          setPasswordError('비밀번호가 일치하지 않습니다.');
        }
      }
    } catch (error) {
      console.error('Error fetching room details:', error);
    }
  };

  useEffect(() => {
    if (isGameStatusModalOpen) {
      const timer = setTimeout(() => {
        onCloseGameStatusModal();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isGameStatusModalOpen]);

  return (
    <div className="flex flex-col gap-10 w-[720px]">
      <div className="flex gap-5 items-center justify-between">
        <SearchBar onFetchRooms={onFetchRooms} />
        <RefreshButton onClick={onRefreshRoomList} />
      </div>

      <div className="grid grid-cols-2 gap-[30px] p-5 h-[440px] bg-primary-default rounded-[10px] border-4 border-black drop-shadow-button overflow-y-scroll scrollbar-hide">
        {rooms.length > 0 ? (
          rooms.map(room => (
            <div key={room.id} onClick={() => onClickRoom(room.id)}>
              <RoomCard
                name={room.name}
                maxPlayers={room.maxPlayers}
                currentPlayers={room.currentPlayers}
                rounds={room.rounds}
                topic={room.topic}
                gameStatus={room.gameStatus}
                isItemsEnabled={room.isItemsEnabled}
                isPublic={room.isPublic}
              />
            </div>
          ))
        ) : (
          <div className="col-span-2 flex justify-center items-center h-full">
            <p className="text-xl font-semibold">방이 없습니다 🤖</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isPasswordModalOpen}
        title="비밀번호 입력"
        onClose={onClosePasswordModal}
      >
        <div className="flex flex-col">
          <p>비밀방에 입장하려면 비밀번호를 입력하세요.</p>
          <div className="flex gap-[30px] mt-5">
            <input
              className="flex-shrink-0 w-[270px] px-5 py-3 border-[3px] border-black rounded-[5px] drop-shadow-button focus:outline-none"
              type="text"
              placeholder="숫자 4자리를 입력하세요"
              maxLength={4}
              value={password}
              onInput={onPasswordInput}
            />
            <Button text="Enter" color="primary" onClick={onSubmitPassword} />
          </div>
          <div className=" text-fuschia font-semibold text-center mt-2">
            {passwordError && <p>{passwordError}</p>}
          </div>
        </div>
      </Modal>

      <GameStatusModal
        isOpen={isGameStatusModalOpen}
        errorType={gameStatusErrorType}
      />
    </div>
  );
};

export default RoomSearchSection;
