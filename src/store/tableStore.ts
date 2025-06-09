import { create } from 'zustand';

interface TableState {
    file: File | null;
    isProcessing: boolean;
    progress: number;
    highlights: string[];
    error: string | null;
    setFile: (file: File | null) => void;
    setIsProcessing: (isProcessing: boolean) => void;
    setProgress: (progress: number) => void;
    setHighlights: (highlights: string[]) => void;
    setError: (error: string | null) => void;
    reset: () => void;
}

export const useTableStore = create<TableState>((set) => ({
    file: null,
    isProcessing: false,
    progress: 0,
    highlights: [],
    error: null,
    setFile: (file) => set({ file }),
    setIsProcessing: (isProcessing) => set({ isProcessing }),
    setProgress: (progress) => set({ progress }),
    setHighlights: (highlights) => set({ highlights }),
    setError: (error) => set({ error }),
    reset: () => set({
        file: null,
        isProcessing: false,
        progress: 0,
        highlights: [],
        error: null,
    }),
})); 