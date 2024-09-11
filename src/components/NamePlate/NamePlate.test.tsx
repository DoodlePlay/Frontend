import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';

import NamePlate from './NamePlate';

describe('NamePlate 컴포넌트 테스트', () => {
  // 성공 케이스: 제목이 정상적으로 렌더링 되는지 확인
  it('제목이 정상적으로 렌더링 되는지 확인', () => {
    render(<NamePlate title="그림쟁이" />);
    expect(screen.getByText('그림쟁이')).toBeInTheDocument();
  });

  // 성공 케이스: 점수가 있을 때 점수가 제대로 렌더링 되는지 확인
  it('점수가 있을 때, 점수가 제대로 렌더링 되는지 확인', () => {
    render(<NamePlate title="그림쟁이" score={200} />);
    expect(screen.getByText('200점')).toBeInTheDocument();
  });

  // 실패 케이스: 점수가 있는데, 점수가 잘못 렌더링 되는 경우
  it('점수가 잘못 렌더링 되었을 때 확인', () => {
    render(<NamePlate title="그림쟁이" score={200} />);
    expect(screen.queryByText('300점')).not.toBeInTheDocument(); // 잘못된 점수값
  });

  // 성공 케이스: isDrawingActive가 true일 때 가로 레이아웃이 적용되는지 확인
  it('isDrawingActive가 true일 때 가로 레이아웃이 적용되는지 확인', () => {
    const { container } = render(
      <NamePlate title="그림쟁이" isDrawingActive />
    );
    expect(container.firstChild?.firstChild).toHaveClass('flex-row');
  });

  // 실패 케이스: isDrawingActive가 false일 때 가로 레이아웃이 적용되지 않아야 함
  it('isDrawingActive가 false일 때 가로 레이아웃이 적용되지 않아야 함', () => {
    const { container } = render(<NamePlate title="그림쟁이" />);
    expect(container.firstChild?.firstChild).not.toHaveClass('flex-row');
  });
});
