import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Settings from './Settings';

describe('Settings 컴포넌트 아이콘 테스트 ', () => {
  it('초기값이 올바르게 렌더링 된다.', () => {
    render(<Settings />);

    // 카메라 꺼진 상태
    const cameraOffIcon = screen.getByAltText('카메라 끄기');
    expect(cameraOffIcon).toHaveClass('filter-none');
    const cameraOnIcon = screen.getByAltText('카메라 켜기');
    expect(cameraOnIcon).toHaveClass('filter-grayscale opacity-20');

    // 효과음 켜진 상태
    const soundOffIcon = screen.getByAltText('효과음 끄기');
    expect(soundOffIcon).toHaveClass('filter-grayscale opacity-20');
    const soundOnIcon = screen.getByAltText('효과음 켜기');
    expect(soundOnIcon).toHaveClass('filter-none');
  });
});
