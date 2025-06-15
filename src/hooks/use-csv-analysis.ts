import { useCallback } from 'react';

import { Highlight } from '@app-types/analysis';
import { API_URL } from '@constants/highlightMappings';
import { transformAnalysisData } from '@utils/analysis';

interface CsvAnalysisParams {
    onData: (data: Highlight[]) => void;
    onError: (error: Error) => void;
    onComplete: () => void;
}

export const useCsvAnalysis = ({
    onData,
    onError,
    onComplete,
}: CsvAnalysisParams) => {
    const analyzeCsv = useCallback(
        async (csv: File) => {
            try {
                const response = await fetch(
                    `${API_URL}/v2/stats:aggregate_as_stream`,
                    {
                        method: 'POST',
                        body: csv,
                        headers: {
                            'Content-Type': 'text/csv',
                        },
                    }
                );

                if (!response.body) {
                    throw new Error('Response body is empty');
                }

                const reader = response.body.getReader();
                let isDone = false;

                while (!isDone) {
                    const { done, value } = await reader.read();
                    isDone = done;
                    if (done) {
                        onComplete();
                        break;
                    }
                    if (value) {
                        const highlights = transformAnalysisData(value);
                        onData(highlights);
                    }
                }
            } catch {
                onError(new Error('Ошибка парсинга :('));
            }
        },
        [onData, onError, onComplete]
    );

    return { analyzeCsv };
};
