import useUserInfoStore from '../../features/profile/store/userInfoStore';

const playSound = src => {
  const sound = new Audio(src);
  sound.preload = 'auto'; // 소리 미리 로드, 선택 사항

  const { isSoundOn } = useUserInfoStore.getState();

  if (!isSoundOn) {
    return; // 효과음이 꺼져있을 때
  }

  sound.currentTime = 0;
  sound.play();
};

export default playSound;
