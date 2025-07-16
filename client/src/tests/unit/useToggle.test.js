import { renderHook, act } from '@testing-library/react-hooks';
import useToggle from '../../hooks/useToggle';

describe('useToggle', () => {
  it('should initialize with false by default', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
  });

  it('should initialize with provided value', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);
  });

  it('should toggle value', () => {
    const { result } = renderHook(() => useToggle());
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(false);
  });

  it('should allow setting value directly', () => {
    const { result } = renderHook(() => useToggle());
    act(() => {
      result.current[2](true);
    });
    expect(result.current[0]).toBe(true);
  });
}); 