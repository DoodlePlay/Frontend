import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import ToggleButton from './ToggleButton';

describe('토글버튼 컴포넌트 테스트', () => {
  it('isOn이 true일 때 올바른 적절한 스타일을 적용한다.', () => {
    render(<ToggleButton isOn={true} onToggle={() => {}} />);

    const toggleButton = screen.getByTestId('toggle-button');
    expect(toggleButton).toHaveClass('bg-primary-default');

    const toggleIndicator = screen.getByTestId('toggle-indicator');
    expect(toggleIndicator).toHaveClass('translate-x-7');
  });

  it('isOn이 false일 때 적절한 스타일을 적용한다.', () => {
    render(<ToggleButton isOn={false} onToggle={() => {}} />);

    const toggleButton = screen.getByTestId('toggle-button');
    expect(toggleButton).toHaveClass('bg-disabled');

    const toggleIndicator = screen.getByTestId('toggle-indicator');
    expect(toggleIndicator).toHaveClass('translate-x-0');
  });

  it('버튼 클릭 시 onToggle 함수가 호출된다.', () => {
    const onToggleMock = vi.fn();
    render(<ToggleButton isOn={false} onToggle={onToggleMock} />);

    const toggleButton = screen.getByTestId('toggle-button');
    fireEvent.click(toggleButton);

    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });
});
