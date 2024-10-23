'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs';

import Button from '../../../components/Button/Button';
import Modal from '../../../components/Modal/Modal';
import RefreshButton from './RefreshButton';
import SearchBar from './SearchBar';
import GameStatusModal from './GameStatusModal';
import RoomCard from './RoomCard';
import { Room, getRoomById, getRooms, joinRoom } from '../api/gameRoomsApi';
import useUserInfoStore from '../../profile/store/userInfoStore';
import useSocketStore from '../../socket/socketStore';

const RoomSearchSection: React.FC = () => {
  const router = useRouter();
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const { nickname, clickedAvatarIndex, isVideoOn, isFlipped } =
    useUserInfoStore();
  const { connectSocket } = useSocketStore();
  const [rooms, setRooms] = useState([]);
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

        const userInfo = {
          nickname,
          score: 0,
          clickedAvatarIndex,
          isVideoOn,
          isFlipped,
        };
        connectSocket(roomId, userInfo, 'joinRoom');
        router.push('/game');
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

          const userInfo = {
            nickname,
            score: 0,
            clickedAvatarIndex,
            isVideoOn,
            isFlipped,
          };
          connectSocket(selectedRoom, userInfo, 'joinRoom');
          router.push('/game');

          onClosePasswordModal();
        } else {
          setPasswordError('비밀번호가 일치하지 않습니다.');
        }
      }
    } catch (error) {
      console.error('Error fetching room details:', error);
    }
  };

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSubmitPassword();
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

  useEffect(() => {
    if (isPasswordModalOpen && passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [isPasswordModalOpen]);

  useEffect(() => {
    onRefreshRoomList();

    const intervalId = setInterval(onRefreshRoomList, 5000);
    return () => clearInterval(intervalId);
  }, []);

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
              onKeyUp={onKeyPress}
              ref={passwordInputRef}
            />
            <Button text="Enter" color="primary" onClick={onSubmitPassword} />
          </div>
          <div className=" text-fuschia font-semibold mt-3">
            {passwordError && <p className="pl-[2px]">{passwordError}</p>}
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
