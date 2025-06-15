

import { getHistory } from '@utils/storage';
import { HistoryItemType } from '@utils/types';
import { create } from 'zustand';

type HistoryState = {
    history: HistoryItemType[];
    selectedItem: HistoryItemType | null;
    isOpenModal: boolean;
    clearHistory: () => void;
    removeFromHistory: (id: string) => void;
    addToHistory: (item: HistoryItemType) => void;
    setSelectedItem: (item: HistoryItemType) => void;
    resetSelectedItem: () => void;
    showModal: () => void;
    hideModal: () => void;
    reset: () => void;
};

export const useHistoryStore = create<HistoryState>((set) => ({
    history: getHistory(),
    selectedItem: null,
    isOpenModal: false,
    clearHistory: () => set({ history: [] }),
    removeFromHistory: (id) =>
        set((state) => ({
            history: state.history.filter((item) => item.id !== id),
        })),
    addToHistory: (item) =>
        set((state) => ({
            history: [...state.history, item],
        })),
    setSelectedItem: (item) => set({ selectedItem: item }),
    resetSelectedItem: () => set({ selectedItem: null }),
    showModal: () => set({ isOpenModal: true }),
    hideModal: () => set({ isOpenModal: false }),
    reset: () =>
        set({
            selectedItem: null,
            isOpenModal: false,
            history: [],
        }),
}));
