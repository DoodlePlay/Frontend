import RoomCard from './RoomCard';

const RoomList: React.FC = () => {
  const rooms = [
    {
      id: 1,
      name: '모두 모이세요~!',
      maxPlayers: 6,
      currentPlayers: 3,
      rounds: 3,
      topic: '동물',
      gameStatus: 'waiting',
      isItemsEnabled: true,
      isPrivate: false,
    },
    {
      id: 2,
      name: '널 위한 방',
      maxPlayers: 6,
      currentPlayers: 5,
      rounds: 5,
      topic: '과일',
      gameStatus: 'playing',
      isItemsEnabled: false,
      isPrivate: true,
    },
    {
      id: 3,
      name: '널 위한 방',
      maxPlayers: 6,
      currentPlayers: 5,
      rounds: 5,
      topic: '과일',
      gameStatus: 'playing',
      isItemsEnabled: false,
      isPrivate: true,
    },
    {
      id: 4,
      name: '모두 모이세요~!',
      maxPlayers: 6,
      currentPlayers: 3,
      rounds: 3,
      topic: '동물',
      gameStatus: 'waiting',
      isItemsEnabled: true,
      isPrivate: false,
    },
    {
      id: 5,
      name: '모두 모이세요~!',
      maxPlayers: 6,
      currentPlayers: 3,
      rounds: 3,
      topic: '동물',
      gameStatus: 'waiting',
      isItemsEnabled: true,
      isPrivate: false,
    },
    {
      id: 6,
      name: '널 위한 방',
      maxPlayers: 6,
      currentPlayers: 5,
      rounds: 5,
      topic: '과일',
      gameStatus: 'playing',
      isItemsEnabled: false,
      isPrivate: true,
    },
    {
      id: 7,
      name: '널 위한 방',
      maxPlayers: 6,
      currentPlayers: 5,
      rounds: 5,
      topic: '과일',
      gameStatus: 'playing',
      isItemsEnabled: false,
      isPrivate: true,
    },
    {
      id: 8,
      name: '모두 모이세요~!',
      maxPlayers: 6,
      currentPlayers: 3,
      rounds: 3,
      topic: '동물',
      gameStatus: 'waiting',
      isItemsEnabled: true,
      isPrivate: false,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-[30px] p-5 h-[440px] bg-primary-default rounded-[10px] border-4 border-black drop-shadow-button overflow-y-scroll scrollbar-hide">
      {rooms.map(room => (
        <RoomCard
          key={room.id}
          name={room.name}
          maxPlayers={room.maxPlayers}
          currentPlayers={room.currentPlayers}
          rounds={room.rounds}
          topic={room.topic}
          gameStatus={room.gameStatus}
          isItemsEnabled={room.isItemsEnabled}
          isPrivate={room.isPrivate}
        />
      ))}
    </div>
  );
};

export default RoomList;
