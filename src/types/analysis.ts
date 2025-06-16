export interface Highlight {
    title: string;
    description: string;
}

export type AnalysisStatus = 'idle' | 'processing' | 'completed' | 'error';
