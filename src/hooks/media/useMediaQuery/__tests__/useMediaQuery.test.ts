import index from '../index';

import {renderHook} from '@lib/testing-library/react';

describe('index hook test', () => {
  test('should update matches when media query matches', () => {
    const query = '(min-width: 768px)';
    const matchMediaMock = jest.fn().mockReturnValue({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });
    window.matchMedia = matchMediaMock;

    const {result} = renderHook(() => index(query));

    expect(result.current).toBe(true);
    expect(matchMediaMock).toHaveBeenCalledWith(query);
  });
});
