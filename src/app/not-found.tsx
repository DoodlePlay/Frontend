import React from 'react';
import Link from 'next/link';

// 추후 html 및 css 수정 (로고 및 배경 div 추가)
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-cherry text-black">404</h1>
      <p className="text-xl text-neutral-default mt-4">
        페이지를 찾을 수 없습니다.
      </p>
      <Link
        href="/"
        className="mt-6 px-4 py-2 bg-primary-default text-white rounded-md hover:bg-primary-600 transition-colors"
      >
        메인 페이지로 돌아가기
      </Link>
    </div>
  );
};

export default NotFoundPage;
