import React, { useState } from 'react';

import { getRooms } from '../api/gameRoomsApi';

const SearchBar: React.FC<{ onFetchRooms: (rooms: any[]) => void }> = ({
  onFetchRooms,
}) => {
  const [inputValue, setInputValue] = useState('');

  const onKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      try {
        const fetchedRooms = await getRooms();
        const filteredRooms = fetchedRooms.filter(room =>
          room.name.includes(inputValue)
        );
        onFetchRooms(filteredRooms);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setInputValue('');
      }
    }
  };

  return (
    <div className="flex items-center gap-5 w-full h-[60px] px-5 rounded-[10px] border-4 border-black">
      <img src="/images/lobby/search.svg" alt="Search Icon" draggable="false" />
      <input
        type="text"
        placeholder="방 제목을 입력하고 Enter 키를 누르세요"
        className="w-full text-2xl font-bold text-black focus:outline-none"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={onKeyDown} // Enter 키 입력 처리
      />
    </div>
  );
};

export default SearchBar;
