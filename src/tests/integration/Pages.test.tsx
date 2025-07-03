import { HistoryItemType } from '@app-types/history';
import { GeneratePage } from '@pages/Generate';
import { HistoryPage } from '@pages/History';
import { useHistoryStore } from '@store/historyStore';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest';

vi.mock('@utils/analysis', () => ({
    convertHighlightsToArray: vi.fn((highlights) => [
        { title: highlights.total_spend_galactic.toString(), description: 'Общие расходы' },
        { title: highlights.rows_affected.toString(),      description: 'Количество обработанных записей' },
        { title: highlights.less_spent_at.toString(),      description: 'День с минимальными расходами' },
        { title: highlights.big_spent_at.toString(),       description: 'День с максимальными расходами' },
        { title: highlights.less_spent_value.toString(),   description: 'Минимальная сумма расходов' },
        { title: highlights.big_spent_value.toString(),    description: 'Максимальная сумма расходов' },
        { title: highlights.average_spend_galactic.toString(), description: 'Средние расходы' },
        { title: highlights.big_spent_civ,                 description: 'Цивилизация с максимальными расходами' },
        { title: highlights.less_spent_civ,                description: 'Цивилизация с минимальными расходами' },
    ]),
}));

describe('HistoryPage → GeneratePage integration', () => {
    beforeEach(() => {
        // Reset the Zustand store state
        useHistoryStore.getState().reset();

        // Create a real Response object to avoid `any`
        const csvBlob = new Blob(['content'], { type: 'text/csv' });
        const headers = new Headers({
            'Content-Disposition': 'attachment; filename="report.csv"',
        });
        const mockResponse = new Response(csvBlob, { headers });

        vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('navigates to GeneratePage when "Generate More" is clicked', async () => {
        const sampleHistory: HistoryItemType[] = [
            {
                id: '1',
                fileName: 'test.csv',
                timestamp: Date.now(),
                highlights: {
                    total_spend_galactic: 1000,
                    rows_affected:        50,
                    less_spent_at:        10,
                    big_spent_at:         200,
                    less_spent_value:     50,
                    big_spent_value:      500,
                    average_spend_galactic: 100,
                    big_spent_civ:        'Earth',
                    less_spent_civ:       'Mars',
                },
            },
        ];
        useHistoryStore.setState({ history: sampleHistory });

        render(
            <MemoryRouter initialEntries={['/history']}>
                <Routes>
                    <Route path="/history" element={<HistoryPage />} />
                    <Route path="/generate" element={<GeneratePage />} />
                </Routes>
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole('button', { name: /сгенерировать больше/i }));

        await waitFor(() => {
            expect(
                screen.getByText('Сгенерируйте готовый csv-файл нажатием одной кнопки')
            ).toBeDefined();
            expect(
                screen.getByRole('button', { name: /начать генерацию/i })
            ).toBeDefined();
        });
    });
});
