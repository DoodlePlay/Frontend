'use client';

import Avatar from '../../../components/Avatar/Avatar';
import Settings from '../../../components/Settings/Settings';
import { Avatars } from '../../profile/components/Nickname';
import useUserInfoStore from '../../profile/store/userInfoStore';

const UserProfileSection = () => {
  const { clickedAvatarIndex, isVideoOn, nickname } = useUserInfoStore();

  return (
    <div className="flex flex-col items-center ">
      <Avatar
        src={Avatars[clickedAvatarIndex].src}
        size="medium"
        isVideoOn={isVideoOn}
        isMyCharacter
      />
      <h1 className="my-[20px] text-[24px] font-bold">{nickname}</h1>
      <Settings />
    </div>
  );
};

export default UserProfileSection;
