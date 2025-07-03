import { getHistory, addToHistory, removeFromHistory, clearHistory } from '@utils/storage.ts';
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';

import type { HistoryItemType } from '@app-types/history.ts';

describe('History Storage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('returns an empty list when nothing is saved', () => {
    const result = getHistory();
    expect(result).toEqual([]);
  });

  test('retrieves data previously saved in localStorage', () => {
    const storedRecords: HistoryItemType[] = [
      {
        id: 'abc123',
        fileName: 'file.csv',
        timestamp: 1610000000000,
        highlights: {
          total_spend_galactic: 50,
          rows_affected: 200,
          less_spent_at: 10,
          big_spent_at: 20,
          less_spent_value: 500,
          big_spent_value: 800,
          average_spend_galactic: 65,
          big_spent_civ: 'civA',
          less_spent_civ: 'civB',
        },
      },
    ];
    localStorage.setItem('tableHistory', JSON.stringify(storedRecords));

    const fetched = getHistory();
    expect(fetched).toEqual(storedRecords);
  });

  test('addToHistory appends a new entry with id and timestamp', () => {
    const newEntry = {
      fileName: 'new.csv',
      highlights: {
        total_spend_galactic: 75,
        rows_affected: 150,
        less_spent_at: 5,
        big_spent_at: 35,
        less_spent_value: 300,
        big_spent_value: 900,
        average_spend_galactic: 80,
        big_spent_civ: 'civC',
        less_spent_civ: 'civD',
      },
    } as Omit<HistoryItemType, 'id' | 'timestamp'>;

    const saved = addToHistory(newEntry);

    expect(typeof saved.id).toBe('string');
    expect(saved.timestamp).toBeGreaterThan(0);
    expect(getHistory()).toContainEqual(saved);
  });

  test('removeFromHistory deletes the specified entry', () => {
    const entry = addToHistory({ fileName: 'del.csv' });
    removeFromHistory(entry.id);

    const remaining = getHistory();
    expect(remaining).toHaveLength(0);
  });

  test('clearHistory removes all entries', () => {
    addToHistory({ fileName: 'x.csv' } );
    clearHistory();

    expect(getHistory()).toEqual([]);
  });
});
