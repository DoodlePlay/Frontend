import useUserInfoStore from '../../features/profile/store/userInfoStore';

const playSound = (src: string, volume: number) => {
  const sound = new Audio(src);
  sound.preload = 'auto'; // 소리 미리 로드, 선택 사항

  const { isSoundOn } = useUserInfoStore.getState();

  if (!isSoundOn) {
    return; // 효과음이 꺼져있을 때
  }

  sound.volume = volume; // 볼륨 설정 (0.0 ~ 1.0)
  sound.currentTime = 0;
  sound.play();
};

export default playSound;
