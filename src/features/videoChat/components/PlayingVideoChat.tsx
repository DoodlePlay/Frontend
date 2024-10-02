'use client';

import { useMemo, useState } from 'react';

import Avatar from '../../../components/Avatar/Avatar';
import { Avatars } from '../../profile/components/Nickname';
import NamePlate from '../../../components/NamePlate';
import useUserInfoStore from '../../profile/store/userInfoStore';

const data = {
  turn: 2,
  order: [1, 2, 3, 4, 5, 6],
  currentDrawer: 1,
  participants: {
    1: {
      nickname: '권도형권도형',
      score: 0,
      clickedAvatarIndex: 0,
      isVideoOn: false,
      isFlipped: true,
    },
    2: {
      nickname: '김영재',
      score: 0,
      clickedAvatarIndex: 1,
      isVideoOn: false,
      isFlipped: true,
    },
    3: {
      nickname: '변정민',
      score: 0,
      clickedAvatarIndex: 2,
      isVideoOn: false,
      isFlipped: true,
    },
    4: {
      nickname: '황수민',
      score: 0,
      clickedAvatarIndex: 3,
      isVideoOn: false,
      isFlipped: true,
    },
    5: {
      nickname: '그림쟁이',
      score: 0,
      clickedAvatarIndex: 4,
      isVideoOn: false,
      isFlipped: true,
    },
    6: {
      nickname: '이웅모',
      score: 0,
      clickedAvatarIndex: 5,
      isVideoOn: false,
      isFlipped: true,
    },
  },
};

const PlayingVideoChat = () => {
  const { nickname } = useUserInfoStore();
  const [correctIds, setCorrectIds] = useState([]);
  const [gameData, setGameData] = useState(data); // 인원수에 따른 배치 테스트를 위한 데이터 상태 관리, 추후 삭제

  const sortedOrder = useMemo(() => {
    const arr = [];
    for (let i = 0; i < gameData.order.length; i++) {
      if (gameData.order[i] === gameData.currentDrawer) {
        arr.unshift(gameData.currentDrawer);
        continue;
      }
      arr.push(gameData.order[i]);
    }
    return arr;
  }, [gameData.turn, gameData]);

  //문제를 맞췄을 때 점수 효과를 위한 함수, 추후 다른 로직으로 변경
  const onPlusScore = userId => {
    setCorrectIds(prevIds => [...prevIds, userId]); // 클릭된 아바타를 배열에 추가
    setTimeout(() => {
      setCorrectIds(prevIds => prevIds.filter(id => id !== userId)); // 2초 후 해당 아바타를 배열에서 제거
    }, 2000);
  };

  //2 ~ 6 명의 인원 수 배치 테스트를 위한 테스트 함수, 추후 삭제
  const numbers = [2, 3, 4, 5, 6];
  const onLengthChange = number => {
    let sampleOrder = [];
    for (let i = 1; i <= number; i++) {
      sampleOrder.push(i);
    }
    // 상태 업데이트로 변경
    setGameData(prevData => ({
      ...prevData,
      order: sampleOrder,
    }));
  };
  return (
    <>
      <div className="flex flex-wrap gap-y-[10px]">
        {sortedOrder.map((userId, index) => (
          <div
            key={userId}
            onClick={() => {
              onPlusScore(userId);
            }}
            className={`relative flex flex-col items-center ${(() => {
              if (gameData.order.length === 2) {
                if (index === 0) return 'w-full';
                else return 'w-full mb-[179px]';
              }
              if (gameData.order.length === 3) {
                if (index === 0) return 'w-full';
                else return 'w-1/2 mb-[179px]';
              }
              if (gameData.order.length === 4) {
                if (index === 0) return 'w-full';
                if (index === 1 || index === 2) return 'mr-[60px] mb-[179px]';
              }
              if (gameData.order.length === 5) {
                if (index === 0) return 'w-full';
                else return 'w-1/2';
              }
              if (gameData.order.length === 6) {
                if (index === 0) return 'w-full';
                if (index === 1 || index === 2) return 'mr-[60px]';
                if (index === 4) return 'w-[100px] ml-[80px] mr-[60px]';
              }
              return '';
            })()}`} // 즉시 실행 함수로 수정
          >
            {/* 정답 시 드라마틱한 효과를 위한 outline 스타일 컨펌 후 수정 */}
            <div
              className={`${
                correctIds.includes(userId)
                  ? 'outline outline-3 outline-[#0f0] rounded-full'
                  : ''
              }`}
            >
              <Avatar
                src={
                  Avatars[gameData.participants[userId].clickedAvatarIndex].src
                }
                size={userId === gameData.currentDrawer ? 'large' : 'small'}
                isMyCharacter={
                  gameData.participants[userId].nickname === nickname
                }
                className={`${
                  correctIds.includes(userId)
                    ? 'filter brightness-[0.6] outline-0'
                    : ''
                }`}
              />
            </div>
            <NamePlate
              title={gameData.participants[userId].nickname}
              score={gameData.participants[userId].score}
              isDrawingActive={userId === gameData.currentDrawer}
            />
            <div
              className={`absolute font-cherry font-bold text-[#0f0] transition-transform duration-500 ease-in-out select-none
              ${index === 0 ? 'top-[140px] text-4xl' : 'top-[70px] text-2xl'} ${
                correctIds.includes(userId)
                  ? 'opacity-100 visible'
                  : 'opacity-0 invisible'
              } ${
                correctIds.includes(userId)
                  ? index === 0
                    ? 'translate-y-[-70px]'
                    : 'translate-y-[-35px]'
                  : ''
              }`}
            >
              + 10
            </div>
          </div>
        ))}
      </div>
      {/* 인원 수에 따른 배치테스트를 위한 버튼, 추후 삭제 */}
      <div className="mt-[30px] ml-[120px]">
        {numbers.map(num => (
          <button
            key={num}
            onClick={() => onLengthChange(num)}
            className="w-6 mx-2 bg-gray-400 text-[#0f0] pb-[2px] rounded-[7px]"
          >
            {num}
          </button>
        ))}
      </div>
    </>
  );
};
export default PlayingVideoChat;

// 'use client';

// import { useEffect, useState } from 'react';

// import Avatar from '../../../components/Avatar/Avatar';
// import { Avatars } from '../../profile/components/Nickname';
// import NamePlate from '../../../components/NamePlate';
// import useUserInfoStore from '../../profile/store/userInfoStore';

// const data = {
//   turn: 2,
//   order: [1, 2, 3, 4, 5, 6],
//   currentDrawer: 1,
//   participants: {
//     1: {
//       nickname: '권도형권도형',
//       score: 0,
//       clickedAvatarIndex: 0,
//       isVideoOn: false,
//       isFlipped: true,
//     },
//     2: {
//       nickname: '김영재',
//       score: 0,
//       clickedAvatarIndex: 1,
//       isVideoOn: false,
//       isFlipped: true,
//     },
//     3: {
//       nickname: '변정민',
//       score: 0,
//       clickedAvatarIndex: 2,
//       isVideoOn: false,
//       isFlipped: true,
//     },
//     4: {
//       nickname: '황수민',
//       score: 0,
//       clickedAvatarIndex: 3,
//       isVideoOn: false,
//       isFlipped: true,
//     },
//     5: {
//       nickname: '그림쟁이',
//       score: 0,
//       clickedAvatarIndex: 4,
//       isVideoOn: false,
//       isFlipped: true,
//     },
//     6: {
//       nickname: '이웅모',
//       score: 0,
//       clickedAvatarIndex: 5,
//       isVideoOn: false,
//       isFlipped: true,
//     },
//   },
// };

// const PlayingVideoChat = () => {
//   const [sortedOrder, setSortedOrder] = useState([]);
//   const { nickname } = useUserInfoStore();
//   const [correctIds, setCorrectIds] = useState([]);

//   useEffect(() => {
//     const arr = [];
//     for (let i = 0; i < data.order.length; i++) {
//       if (data.order[i] === data.currentDrawer) {
//         arr.unshift(data.currentDrawer);
//         continue;
//       }
//       arr.push(data.order[i]);
//     }
//     setSortedOrder(arr);
//   }, [data.turn]);

//   const onPlusScore = userId => {
//     setCorrectIds(prevIds => [...prevIds, userId]);
//     setTimeout(() => {
//       setCorrectIds(prevIds => prevIds.filter(id => id !== userId));
//     }, 2000);
//   };

//   return (
//     <div className="flex flex-wrap gap-y-[10px]">
//       {sortedOrder.map((userId, index) => (
//         <div
//           key={userId}
//           onClick={() => {
//             onPlusScore(userId);
//           }}
//           className={`relative flex flex-col items-center ${(() => {
//             if (data.order.length === 2) {
//               if (index === 0) return 'w-full';
//               else return 'w-full mb-[179px]';
//             }
//             if (data.order.length === 3) {
//               if (index === 0) return 'w-full';
//               else return 'w-1/2 mb-[179px]';
//             }
//             if (data.order.length === 4) {
//               if (index === 0) return 'w-full';
//               if (index === 1 || index === 2) return 'mr-[60px] mb-[179px]';
//             }
//             if (data.order.length === 5) {
//               if (index === 0) return 'w-full';
//               else return 'w-1/2';
//             }
//             if (data.order.length === 6) {
//               if (index === 0) return 'w-full';
//               if (index === 1 || index === 2) return 'mr-[60px]';
//               if (index === 4) return 'w-[100px] ml-[80px] mr-[60px]';
//             }
//             return '';
//           })()}`} // 즉시 실행 함수로 수정
//         >
//           <Avatar
//             src={Avatars[data.participants[userId].clickedAvatarIndex].src}
//             size={userId === data.currentDrawer ? 'large' : 'small'}
//             isMyCharacter={data.participants[userId].nickname === nickname}
//             className={`${
//               correctIds.includes(userId) ? 'filter brightness-[0.6]' : ''
//             }`}
//           />
//           <NamePlate
//             title={data.participants[userId].nickname}
//             score={data.participants[userId].score}
//             isDrawingActive={userId === data.currentDrawer}
//           />
//           <div
//             className={`absolute font-cherry font-bold text-[#0f0] transition-transform duration-500 ease-in-out
//               ${index === 0 ? 'top-[140px] text-4xl' : 'top-[70px] text-2xl'} ${
//               correctIds.includes(userId)
//                 ? 'opacity-100 visible'
//                 : 'opacity-0 invisible'
//             } ${
//               correctIds.includes(userId)
//                 ? index === 0
//                   ? 'translate-y-[-70px]'
//                   : 'translate-y-[-35px]'
//                 : ''
//             }`}
//           >
//             + 10
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };
// export default PlayingVideoChat;
