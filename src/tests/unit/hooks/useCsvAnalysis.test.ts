import { useCsvAnalysis } from '@hooks/use-csv-analysis';
import { renderHook } from '@testing-library/react';
import { InvalidServerResponseError, transformAnalysisData } from '@utils/analysis';
import { describe, test, expect, beforeEach, vi } from 'vitest';

vi.mock('@utils/analysis', () => ({
    InvalidServerResponseError: class extends Error {
        constructor(message?: string) {
            super(message);
            this.name = 'InvalidServerResponseError';
        }
    },
    transformAnalysisData: vi.fn(),
}));

describe('useCsvAnalysis hook', () => {
    let onData: ReturnType<typeof vi.fn>;
    let onError: ReturnType<typeof vi.fn>;
    let onComplete: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        vi.resetAllMocks();
        onData     = vi.fn();
        onError    = vi.fn();
        onComplete = vi.fn();
        global.fetch = vi.fn();
    });

    test('invokes onData and onComplete for valid CSV', async () => {
        const fakeHighlights = { foo: 'bar' } as unknown as never;
        const fakeToStore    = [{ title: 'foo', description: 'bar' }];
        vi.mocked(transformAnalysisData).mockReturnValue({
            highlights: fakeHighlights,
            highlightsToStore: fakeToStore,
        });

        const data   = JSON.stringify({ any: 'data' });
        const buffer = new TextEncoder().encode(data);
        const reader = {
            read: vi
                .fn()
                .mockResolvedValueOnce({ done: false, value: buffer })
                .mockResolvedValueOnce({ done: true }),
        };
        vi.mocked(global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
            ok: true,
            body: { getReader: () => reader },
        });

        const { result } = renderHook(() =>
            useCsvAnalysis({ onData, onError, onComplete })
        );
        await result.current.analyzeCsv(new File([''], 'report.csv', { type: 'text/csv' }));

        expect(onData).toHaveBeenCalledWith(fakeToStore);
        expect(onComplete).toHaveBeenCalledWith(fakeHighlights);
        expect(onError).not.toHaveBeenCalled();
    });

    test('invokes onError if response shape is wrong', async () => {
        vi.mocked(transformAnalysisData).mockImplementation(() => {
            throw new InvalidServerResponseError('Неизвестная ошибка парсинга :(');
        });

        const buffer = new TextEncoder().encode('{}');
        const reader = { read: vi.fn().mockResolvedValue({ done: false, value: buffer }) };
        vi.mocked(global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
            ok: true,
            body: { getReader: () => reader },
        });

        const { result } = renderHook(() =>
            useCsvAnalysis({ onData, onError, onComplete })
        );
        await result.current.analyzeCsv(new File([''], 'bad.csv', { type: 'text/csv' }));

        expect(onError).toHaveBeenCalled();
        const errorArg = onError.mock.calls[0][0];
        expect(errorArg).toBeInstanceOf(InvalidServerResponseError);
        expect(errorArg.message).toBe('Неизвестная ошибка парсинга :(');
        expect(onComplete).not.toHaveBeenCalled();
    });
});
