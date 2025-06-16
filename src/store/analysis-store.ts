import { AnalysisStatus, Highlight } from '@app-types/analysis';
import { create } from 'zustand';

interface AnalysisState {
    file: File | null;
    status: AnalysisStatus;
    highlights: Highlight[];
    error: string | null;
    setFile: (file: File | null) => void;
    setStatus: (status: AnalysisStatus) => void;
    setHighlights: (highlights: Highlight[]) => void;
    setError: (error: string | null) => void;
    reset: () => void;
}

const initialState = {
    file: null,
    status: 'idle' as AnalysisStatus,
    highlights: [],
    error: null,
};

export const useAnalysisStore = create<AnalysisState>((set) => ({
    ...initialState,
    setFile: (file) =>
        set({ file, status: 'idle', highlights: [], error: null }),
    setStatus: (status) => set({ status }),
    setHighlights: (highlights) => set({ highlights }),
    setError: (error) => set({ error, status: 'error' }),
    reset: () => set(initialState),
}));
