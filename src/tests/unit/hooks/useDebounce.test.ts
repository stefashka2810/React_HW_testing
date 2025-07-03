import { useDebounce } from '@hooks/use-debounce';
import { renderHook } from '@testing-library/react';
import { act } from '@testing-library/react';
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';

describe('useDebounce hook', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    test('batches calls with timeout debounce', () => {
        const handler = vi.fn();
        const { result } = renderHook(() =>
            useDebounce(handler, { type: 'timeout', delay: 200 })
        );
        const debounced = result.current;

        debounced(1);
        debounced(2);
        debounced(3);

        expect(handler).not.toHaveBeenCalled();

        act(() => {
            vi.advanceTimersByTime(200);
        });

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith(1);
    });

    test('uses requestAnimationFrame by default', () => {
        const handler = vi.fn();
        const rafs: FrameRequestCallback[] = [];
        global.requestAnimationFrame = (cb: FrameRequestCallback) => {
            rafs.push(cb);
            return 0;
        };

        const { result } = renderHook(() => useDebounce(handler));
        const debounced = result.current;

        debounced('a');
        debounced('b');
        debounced('c');

        expect(handler).not.toHaveBeenCalled();

        rafs.forEach(cb => cb(performance.now()));

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith('a');
    });
});
