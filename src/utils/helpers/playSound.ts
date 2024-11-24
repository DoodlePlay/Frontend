import useUserInfoStore from '../../features/profile/store/userInfoStore';

let currentSound = null; // 현재 재생 중인 효과음

const playSound = src => {
  // 기존 효과음을 중지
  if (currentSound) {
    currentSound.pause();
    currentSound.currentTime = 0;
  }

  const sound = new Audio(src);
  sound.preload = 'auto'; // 소리 미리 로드, 선택 사항

  const { isSoundOn } = useUserInfoStore.getState();

  if (!isSoundOn) {
    return; // 효과음이 꺼져있을 때
  }

  sound.currentTime = 0;
  sound.play();
  currentSound = sound; // 현재 재생 중인 효과음 업데이트
};

export const stopCurrentSound = () => {
  if (currentSound) {
    currentSound.pause();
    currentSound.currentTime = 0;
    currentSound = null; // 초기화
  }
};

export default playSound;
