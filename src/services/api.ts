const API_BASE_URL = 'https://api.example.com'; // TODO: Replace with actual API URL

export interface TableProcessingResponse {
    progress: number;
    highlights?: string[];
    error?: string;
}

export const processTable = async (
    file: File,
    onProgress: (progress: number) => void
): Promise<string[]> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(`${API_BASE_URL}/process`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to process table');
        }

        const reader = response.body?.getReader();
        if (!reader) {
            throw new Error('Failed to read response');
        }

        let highlights: string[] = [];
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = new TextDecoder().decode(value);
            const data: TableProcessingResponse = JSON.parse(chunk);

            if (data.error) {
                throw new Error(data.error);
            }

            onProgress(data.progress);
            if (data.highlights) {
                highlights = [...highlights, ...data.highlights];
            }
        }

        return highlights;
    } catch (error) {
        throw error instanceof Error
            ? error
            : new Error('Unknown error occurred');
    }
};

export const generateTable = async (): Promise<Blob> => {
    try {
        const response = await fetch(`${API_BASE_URL}/generate`, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Failed to generate table');
        }

        return await response.blob();
    } catch (error) {
        throw error instanceof Error
            ? error
            : new Error('Failed to generate table');
    }
};
