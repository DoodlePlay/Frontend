import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('버튼 렌더링', () => {
  it('버튼의 텍스트가 올바르게 렌더링 되는지 테스트', () => {
    render(<Button text="Click button" />);

    // "Click button"라는 문자열이 포함된 버튼이 DOM에 존재하는지 확인
    const button = screen.getByText('Click button');
    expect(button).toBeInTheDocument();
  });

  it('이벤트 핸들러가 올바르게 작동하는지 테스트', () => {
    const onClick = vi.fn(); // 모의 함수 생성
    render(<Button text="Click button" onClick={onClick} />);

    const button = screen.getByText('Click button');

    // 클릭 이벤트 시뮬레이션
    fireEvent.click(button);

    // 클릭 핸들러가 한 번 호출됐는지 확인
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
