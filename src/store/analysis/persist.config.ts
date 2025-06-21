import { PersistOptions } from 'zustand/middleware';

import { AnalysisState } from './types';

const PERSISTED_KEYS: (keyof AnalysisState)[] = [
    // 'status',
    // 'highlights',
];

export const analysisPersistConfig: PersistOptions<AnalysisState, AnalysisState> = {
    name: 'analysis-storage',

    /**
     * Функция, которая определяет, какую часть состояния сохранять.
     * Мы сохраняем только те ключи, которые явно перечислены в PERSISTED_KEYS.
     */
    partialize: (state) =>
        Object.fromEntries(
            Object.entries(state).filter(([key]) => PERSISTED_KEYS.includes(key as keyof AnalysisState))
        ) as AnalysisState,
};
