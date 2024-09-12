import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Button from './Button';

describe('버튼 컴포넌트', () => {
  const testCases = [
    {
      color: 'primary',
      expectedClass:
        'bg-primary-default hover:bg-primary-600 text-secondary-default',
      expectedStroke: { WebkitTextStroke: '1px white' },
    },
    {
      color: 'secondary',
      expectedClass: 'bg-secondary-default hover:bg-secondary-800 text-white',
      expectedStroke: { WebkitTextStroke: '2px #ffc700' },
    },
    {
      color: 'neutral',
      expectedClass: 'bg-disabled hover:bg-neutral-300 text-neutral-default',
      expectedStroke: { WebkitTextStroke: '2px white' },
    },
  ] as const;

  testCases.forEach(({ color, expectedClass, expectedStroke }) => {
    it(`color prop이 '${color}'일 때 올바른 스타일이 적용된다.`, () => {
      render(<Button text="TEST" color={color} onClick={() => {}} />);

      const buttonElement = screen.getByText('TEST');

      expect(buttonElement).toBeInTheDocument();

      expectedClass.split(' ').forEach((cls) => {
        expect(buttonElement).toHaveClass(cls);
      });

      Object.entries(expectedStroke).forEach(([key, value]) => {
        expect(buttonElement.style[key]).toBe(value);
      });
    });
  });

  it('버튼이 클릭되면 onClick 핸들러가 호출된다.', () => {
    const onClickButton = vi.fn();

    render(<Button text="TEST" color="primary" onClick={onClickButton} />);

    const buttonElement = screen.getByText('TEST');

    fireEvent.click(buttonElement);

    expect(onClickButton).toHaveBeenCalledTimes(1);
  });

  it('color prop이 유효하지 않으면 기본값 "primary"가 적용된다.', () => {
    render(
      <Button text="TEST" color={'invalidColor' as any} onClick={() => {}} />
    );

    const buttonElement = screen.getByText('TEST');

    expect(buttonElement).toBeInTheDocument();

    expect(buttonElement).toHaveClass(
      'bg-primary-default hover:bg-primary-600 text-secondary-default'
    );
  });
});
