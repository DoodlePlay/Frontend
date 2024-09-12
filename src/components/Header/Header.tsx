'use client'; //Header의 조건부 렌더링을 위해서 Client component로 분리

import React from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const showHeader = pathname === '/' || pathname === '/room';

  if (!showHeader) return null;

  return (
    <div className="flex justify-center mt-[80px] cursor-default">
      <img src="/images/Logo.svg" alt="로고" className="block" />
    </div>
  );
};

export default Header;
