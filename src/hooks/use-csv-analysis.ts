import { useCallback } from 'react';

import { Highlight } from '@app-types/analysis';
import { API_URL } from '@constants/highlightMappings';
import { transformAnalysisData } from '@utils/analysis';

const DEFAULT_ROWS = 1000;

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
                const formData = new FormData();
                formData.append('file', csv);

                const response = await fetch(
                    `${API_URL}/aggregate?rows=${DEFAULT_ROWS}`,
                    {
                        method: 'POST',
                        body: formData,
                    }
                );

                if (!response.body) {
                    throw new Error('Response body is empty');
                }

                if (!response.ok) {
                    throw new Error(
                        response.statusText
                            ? `Произошла ошибка: ${response.statusText}`
                            : 'Неизвестная ошибка при попытке обработать файл'
                    );
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
            } catch (error) {
                onError(
                    new Error(
                        error instanceof Error
                            ? error.message
                            : 'Неизвестная ошибка парсинга :('
                    )
                );
            }
        },
        [onData, onError, onComplete]
    );

    return { analyzeCsv };
};
