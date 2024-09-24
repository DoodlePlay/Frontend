import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Avatar from './Avatar';

beforeAll(() => {
  // navigator.mediaDevices의 mock 설정 (Vitest의 vi 객체 사용)
  global.navigator = {
    mediaDevices: {
      getUserMedia: vi.fn().mockResolvedValue({
        getTracks: vi.fn(),
      }),
      enumerateDevices: vi
        .fn()
        .mockResolvedValue([
          {
            kind: 'videoinput',
            label: 'Mock Camera',
            deviceId: 'mock-device-id',
          },
        ]),
    },
  } as unknown as Navigator;
});

describe('아바타 컴포넌트', () => {
  it('카메라가 꺼져있으면 캐릭터 이미지가 렌더링된다.', () => {
    render(<Avatar src="/images/avatars/man-1.svg" />);
    const img = screen.getByAltText('Avatar');
    expect(img).toBeInTheDocument();
  });

  it('카메라가 켜져있다면 아바타에 촬영중인 화면이 렌더링된다.', () => {
    render(<Avatar src="/images/avatars/man-1.svg" isVideoOn={true} />);
    const video = screen.getByRole('video');
    expect(video).toBeInTheDocument();
  });

  it('클릭된 아바타의 배경색상이 변경된다.', () => {
    render(<Avatar src="/images/avatars/man-1.svg" isClicked={true} />);
    const avatarDiv = screen.getByAltText('Avatar').parentElement;
    expect(avatarDiv).toHaveClass('bg-primary-default');
  });

  it('속성에 따라 크기와 배경색상이 변경된다.', () => {
    render(<Avatar src="/images/avatars/man-1.svg" size="medium" />);
    const avatarDiv = screen.getByAltText('Avatar').parentElement;
    expect(avatarDiv).toHaveClass('w-[160px] h-[160px]');
    expect(avatarDiv).toHaveClass('bg-white');
  });
});
