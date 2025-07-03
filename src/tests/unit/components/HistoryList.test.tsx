import { HistoryList } from '@components/HistoryList/HistoryList';
import { useHistoryStore } from '@store/historyStore';
import { render, screen } from '@testing-library/react';
import { describe, test, beforeEach, expect, vi, type Mock } from 'vitest';

vi.mock('@store/historyStore');

describe('HistoryList component', () => {
    const mockStore = {
        history: [] as Array<{
            id: string;
            fileName: string;
            timestamp: number;
            highlights: unknown[];
        }>,
        showModal: vi.fn(),
        setSelectedItem: vi.fn(),
        removeFromHistoryStore: vi.fn(),
        updateHistoryFromStorage: vi.fn(),
    };

    beforeEach(() => {
        vi.resetAllMocks();
    });

    test('shows an entry when history has items', () => {
        mockStore.history = [
            { id: 'file-123', fileName: 'report.csv', timestamp: Date.now(), highlights: [] },
        ];

        (useHistoryStore as unknown as Mock).mockReturnValue(mockStore);

        render(<HistoryList />);
        expect(screen.getByText('report.csv')).toBeDefined();
    });

    test('renders nothing when history is empty', () => {
        mockStore.history = [];
        (useHistoryStore as unknown as Mock).mockReturnValue(mockStore);

        render(<HistoryList />);
        expect(screen.queryByText('report.csv')).toBeNull();
    });
});
