import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';

import SpeechBubble from './SpeechBubble';

describe('SpeechBubble 컴포넌트 테스트', () => {
  // 성공 케이스: isAvatarSelected가 false일 때 타이틀과 설명(children)이 제대로 렌더링 되는지 확인
  it('isAvatarSelected가 false일 때 타이틀과 설명이 제대로 렌더링 되는지 확인', () => {
    render(
      <SpeechBubble title="Toxic Cover" isAvatarSelected={false}>
        군데군데 독극물을 뿌린다.
      </SpeechBubble>
    );
    expect(screen.getByText('Toxic Cover')).toBeInTheDocument();
    expect(screen.getByText('군데군데 독극물을 뿌린다.')).toBeInTheDocument();
  });

  // 실패 케이스: 잘못된 설명(children)이 렌더링 되지 않는지 확인
  it('잘못된 설명이 렌더링 되지 않는지 확인', () => {
    render(
      <SpeechBubble title="Toxic Cover" isAvatarSelected={false}>
        군데군데 독극물을 뿌린다.
      </SpeechBubble>
    );
    expect(screen.queryByText('잘못된 설명')).not.toBeInTheDocument(); // 잘못된 설명 값
  });

  // 아바타 컴포넌트가 없어서 현재 테스트 코드 추후 적용 예정.

  // 성공 케이스: isAvatarSelected에 따라 말풍선 크기가 다르게 적용되는지 확인
  it('isAvatarSelected에 따라 말풍선 크기가 다르게 적용되는지 확인', () => {
    const { container } = render(<SpeechBubble isAvatarSelected={true} />);
    expect(container.firstChild).toHaveClass('max-w-[520px]');

    const { container: unselectedContainer } = render(
      <SpeechBubble isAvatarSelected={false} />
    );
    expect(unselectedContainer.firstChild).toHaveClass('w-[180px]');
  });
});
