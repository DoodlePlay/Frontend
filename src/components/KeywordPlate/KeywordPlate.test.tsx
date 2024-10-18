import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';

import KeywordPlate from './KeywordPlate';

describe('KeywordPlate 컴포넌트 테스트', () => {
  // 성공 케이스: 단어가 정상적으로 렌더링 되는지 확인
  it('단어가 정상적으로 렌더링 되는지 확인', () => {
    render(<KeywordPlate title="사자" />);
    expect(screen.getByText('사자')).toBeInTheDocument();
  });

  // 실패 케이스: 잘못된 단어가 렌더링 되지 않음을 확인
  it('잘못된 단어가 렌더링 되지 않음을 확인', () => {
    render(<KeywordPlate title="사자" />);
    expect(screen.queryByText('호랑이')).not.toBeInTheDocument();
  });
});
