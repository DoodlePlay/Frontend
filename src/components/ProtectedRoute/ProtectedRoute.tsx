'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import useUserInfoStore from '../../features/profile/store/userInfoStore';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { nickname, clickedAvatarIndex } = useUserInfoStore();

  useEffect(() => {
    if (!nickname || clickedAvatarIndex === undefined) {
      router.replace('/');
    }
  }, [nickname, clickedAvatarIndex, router]);

  return <>{children}</>;
};

export default ProtectedRoute;
