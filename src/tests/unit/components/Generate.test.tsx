import { GeneratePage } from '@pages/Generate';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, beforeEach, vi } from 'vitest';

describe('GeneratePage component', () => {
    let fetchMock: ReturnType<typeof vi.fn>;
    let createBlobURL: ReturnType<typeof vi.fn>;
    let revokeBlobURL: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        fetchMock = vi.fn();
        createBlobURL = vi.fn().mockReturnValue('blob://dummy-url');
        revokeBlobURL = vi.fn();

        global.fetch = fetchMock as unknown as typeof fetch;
        global.URL.createObjectURL = createBlobURL as unknown as typeof URL.createObjectURL;
        global.URL.revokeObjectURL = revokeBlobURL as unknown as typeof URL.revokeObjectURL;
    });

    test('renders main heading and generate button', () => {
        render(<GeneratePage />);
        expect(screen.getByRole('heading', { level: 1 })).toBeDefined();
        const goBtn = screen.getByRole('button', { name: /начать генерацию/i });
        expect(goBtn).toBeDefined();
    });

    describe('when fetch succeeds', () => {
        beforeEach(() => {
            const csvBlob = new Blob(['a,b,c'], { type: 'text/csv' });
            fetchMock.mockResolvedValue({
                ok: true,
                headers: new Map([['content-disposition', 'attachment; filename="report.csv"']]),
                blob: () => Promise.resolve(csvBlob),
            });
        });

        test('uses URL.createObjectURL and shows success message', async () => {
            render(<GeneratePage />);
            await userEvent.click(screen.getByRole('button', { name: /начать генерацию/i }));

            await waitFor(() => {
                expect(createBlobURL).toHaveBeenCalled();
                expect(screen.getByText(/отчёт успешно сгенерирован/i)).toBeDefined();
            });
        });
    });

    describe('when fetch fails', () => {
        beforeEach(() => {
            fetchMock.mockResolvedValue({
                ok: false,
                json: () => Promise.resolve({ error: 'Ошибка на сервере' }),
            });
        });

        test('displays the server error message', async () => {
            render(<GeneratePage />);
            await userEvent.click(screen.getByRole('button', { name: /начать генерацию/i }));
            const errorNotice = await screen.findByText(/произошла ошибка: ошибка на сервере/i);
            expect(errorNotice).toBeDefined();
        });
    });
});
