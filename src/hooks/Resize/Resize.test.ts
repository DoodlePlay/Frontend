import { renderHook, act } from '@testing-library/react';
import Resize from './Resize';

describe('Resize', () => {
  beforeEach(() => {
    // 뷰포트 height 초기값 설정
    global.innerHeight = 800;
  });

  afterEach(() => {
    // 테스트 후 모든 이벤트 리스너를 제거
    vi.clearAllMocks();
  });

  it('초기값은 window.innerHeight가 800이므로, 800 * 0.1 = 80으로 렌더링 되어야한다.', () => {
    const { result } = renderHook(() => Resize());

    expect(result.current).toBe(80);
  });

  it('window.innerHeight가 500일 때 500 * 0.1 = 50으로 렌더링 되어야 한다.', () => {
    const { result } = renderHook(() => Resize());

    act(() => {
      global.innerHeight = 500;
      global.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(50);
  });

  it('window.innerHeight가 1500이어도 최대 크기 100을 넘을 수 없다.', () => {
    const { result } = renderHook(() => Resize());

    act(() => {
      // 뷰포트 height를 1500으로 설정
      global.innerHeight = 1500;
      global.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(100);
  });
});
