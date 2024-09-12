import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Modal from './Modal';

describe('모달 컴포넌트', () => {
  it('isOpen prop이 true일 때 렌더링된다.', () => {
    render(
      <Modal isOpen title="테스트 모달" onClose={() => {}}>
        <p>모달 내용입니다.</p>
      </Modal>
    );

    const modalTitle = screen.getByText('테스트 모달');

    const modalContent = screen.getByText('모달 내용입니다.');

    expect(modalTitle).toBeInTheDocument();

    expect(modalContent).toBeInTheDocument();
  });

  it('isOpen prop이 false일 때 렌더링되지 않는다.', () => {
    render(
      <Modal isOpen={false} title="테스트 모달" onClose={() => {}}>
        <p>모달 내용입니다.</p>
      </Modal>
    );

    const modalTitle = screen.queryByText('테스트 모달');

    const modalContent = screen.queryByText('모달 내용입니다.');

    expect(modalTitle).not.toBeInTheDocument();

    expect(modalContent).not.toBeInTheDocument();
  });

  it('닫기 버튼을 클릭하면 onClose 함수가 호출된다.', () => {
    const onCloseMock = vi.fn();

    render(
      <Modal isOpen title="테스트 모달" onClose={onCloseMock}>
        <p>모달 내용입니다.</p>
      </Modal>
    );

    const closeButton = screen.getByRole('button', { name: /close modal/i });

    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
