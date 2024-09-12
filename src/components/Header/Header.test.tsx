import React from 'react';
import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { describe, it, vi } from 'vitest';

import Header from './Header';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

describe('헤더 컴포넌트', () => {
  it('홈페이지("/")에서 헤더가 렌더링된다.', () => {
    (usePathname as ReturnType<typeof vi.fn>).mockReturnValue('/');
    render(<Header />);
    expect(screen.getByAltText('로고')).toBeInTheDocument();
  });

  it('대기실 페이지("/room")에서 헤더가 렌더링된다.', () => {
    (usePathname as ReturnType<typeof vi.fn>).mockReturnValue('/room');
    render(<Header />);
    expect(screen.getByAltText('로고')).toBeInTheDocument();
  });

  it('그 외의 페이지에서는 헤더가 렌더링되지 않는다.', () => {
    (usePathname as ReturnType<typeof vi.fn>).mockReturnValue('/game');
    render(<Header />);
    expect(screen.queryByAltText('로고')).not.toBeInTheDocument();
  });
});
