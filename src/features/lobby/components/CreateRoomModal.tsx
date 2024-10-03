import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs';

import Modal from '../../../components/Modal/Modal';
import Button from '../../../components/Button/Button';
import { createRoom } from '../api/gameRoomsApi';

interface RoomFormValues {
  roomTitle: string;
  isPublic: string;
  password?: string;
  maxPlayers: number;
  rounds: number;
  topic: string;
  isItemsEnabled: string;
}

const CreateRoomModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<RoomFormValues>({
    defaultValues: {
      roomTitle: '함께해요, Doodle Play 🚀',
      isPublic: 'true',
      maxPlayers: 6,
      rounds: 3,
      topic: '동물',
      isItemsEnabled: 'true',
    },
  });

  const isPublic = watch('isPublic');
  const isItemsEnabled = watch('isItemsEnabled');

  const onSubmit = async (data: RoomFormValues) => {
    let hashedPassword = null;
    if (data.isPublic === 'false' && data.password) {
      const salt = bcrypt.genSaltSync(10);
      hashedPassword = bcrypt.hashSync(data.password, salt);
    }

    const roomData = {
      name: data.roomTitle,
      maxPlayers: data.maxPlayers,
      rounds: data.rounds,
      topic: data.topic,
      isItemsEnabled: data.isItemsEnabled === 'true',
      isPublic: data.isPublic === 'true',
      password: hashedPassword,
    };

    try {
      const roomId = await createRoom(roomData);
      console.log('Room created with ID:', roomId);
      onClose();
      router.push('/game'); // 추후 roomId 붙은 라우터 수정
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} title="방 만들기" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex items-center gap-5 h-11">
          <label className="w-14 text-lg font-bold">방제목</label>
          <input
            {...register('roomTitle', { required: '방제목을 입력하세요.' })}
            type="text"
            placeholder="방제목을 입력하세요."
            className="w-[280px] border-2 border-black py-[10px] px-5 rounded-md focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-5 h-11">
          <label className="w-14 text-lg font-bold">공개방</label>

          <label className="flex items-center gap-2 cursor-pointer mr-4">
            <input
              type="radio"
              value="true"
              {...register('isPublic')}
              defaultChecked
              className="hidden"
            />
            {isPublic === 'true' ? (
              <img
                src="/images/lobby/checked.svg"
                alt="Public room selected"
                draggable="false"
              />
            ) : (
              <img
                src="/images/lobby/unchecked.svg"
                alt="Public room unselected"
                draggable="false"
              />
            )}
            <img
              src="/images/lobby/publicRoom.svg"
              alt="Public room Icon"
              draggable="false"
            />
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="false"
              {...register('isPublic')}
              className="hidden"
            />
            {isPublic === 'false' ? (
              <img
                src="/images/lobby/checked.svg"
                alt="Private room selected"
                draggable="false"
              />
            ) : (
              <img
                src="/images/lobby/unchecked.svg"
                alt="Private room unselected"
                draggable="false"
              />
            )}
            <img
              src="/images/lobby/privateRoom.svg"
              alt="Private room Icon"
              draggable="false"
            />
          </label>

          {isPublic === 'false' && (
            <input
              {...register('password', {
                required: '비밀번호를 입력하세요.',
                validate: value =>
                  value.length === 4 || '비밀번호는 4자리 숫자여야 합니다.',
              })}
              type="text"
              placeholder="숫자 4자리"
              maxLength={4}
              onInput={e =>
                (e.currentTarget.value = e.currentTarget.value.replace(
                  /[^0-9]/g,
                  ''
                ))
              }
              className="w-[118px] border-2 border-black py-[10px] px-5 rounded-md focus:outline-none"
            />
          )}
        </div>

        <div className="flex items-center gap-5 h-11 relative">
          <label className="w-14 text-lg font-bold">인원수</label>

          <div className="relative w-[130px]">
            <select
              {...register('maxPlayers', { required: true })}
              className="appearance-none w-full border-2 border-black py-[10px] px-5 rounded-md focus:outline-none"
            >
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </select>
            <img
              src="/images/lobby/selectArrow.svg"
              alt="Select Icon"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none"
              draggable="false"
            />
          </div>
        </div>

        <div className="flex items-center gap-5 h-11 relative">
          <label className="w-14 text-lg font-bold">라운드</label>

          <div className="relative w-[130px]">
            <select
              {...register('rounds', { required: true })}
              className="appearance-none w-full border-2 border-black py-[10px] px-5 rounded-md focus:outline-none"
            >
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
            <img
              src="/images/lobby/selectArrow.svg"
              alt="Select Icon"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none"
              draggable="false"
            />
          </div>
        </div>

        <div className="flex items-center gap-5 h-11 relative">
          <label className="w-14 text-lg font-bold">주제</label>

          <div className="relative w-[130px]">
            <select
              {...register('topic', { required: true })}
              className="appearance-none w-full border-2 border-black py-[10px] px-5 rounded-md focus:outline-none"
            >
              <option value={'동물'}>동물</option>
              <option value={'사물'}>사물</option>
              <option value={'음식'}>음식</option>
              <option value={'직업'}>직업</option>
              <option value={'스포츠'}>스포츠</option>
              <option value={'동화'}>동화</option>
            </select>
            <img
              src="/images/lobby/selectArrow.svg"
              alt="Select Icon"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none"
              draggable="false"
            />
          </div>
        </div>

        <div className="flex items-center gap-5 h-11">
          <label className="w-14 text-lg font-bold">아이템</label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="true"
              {...register('isItemsEnabled')}
              defaultChecked
              className="hidden"
            />
            {isItemsEnabled === 'true' ? (
              <img
                src="/images/lobby/checked.svg"
                alt="Items enabled selected"
                draggable="false"
              />
            ) : (
              <img
                src="/images/lobby/unchecked.svg"
                alt="Items enabled unselected"
                draggable="false"
              />
            )}
            <span className="text-[18px] font-bold">사용</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="false"
              {...register('isItemsEnabled')}
              className="hidden"
            />
            {isItemsEnabled === 'false' ? (
              <img
                src="/images/lobby/checked.svg"
                alt="Items disabled selected"
                draggable="false"
              />
            ) : (
              <img
                src="/images/lobby/unchecked.svg"
                alt="Items disabled unselected"
                draggable="false"
              />
            )}
            <span className="text-[18px] font-bold">미사용</span>
          </label>
        </div>

        <Button
          type="submit"
          text="Create"
          color="primary"
          className="h-[60px]"
          onClick={handleSubmit(onSubmit)}
        />

        <div className=" text-fuschia text-center font-semibold">
          <p>{errors.roomTitle?.message || errors.password?.message}</p>
        </div>
      </form>
    </Modal>
  );
};

export default CreateRoomModal;
