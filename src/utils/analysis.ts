import { Highlight } from '@app-types/analysis';
import { HIGHLIGHT_TITLES } from '@constants/highlightMappings';

/**
 * Parses the streaming response from the server.
 * @param value The streamed data chunk.
 * @returns The first JSON object from the chunk.
 */
const getFirstJsonObject = (
    value: Uint8Array
): Record<string, string | number> => {
    const decoder = new TextDecoder();
    const textChunk = decoder.decode(value).split('\n')[0];
    return JSON.parse(textChunk);
};

/**
 * Transforms the raw API response into an array of Highlight objects.
 * @param rawData The raw data object from the API.
 * @returns An array of formatted highlights.
 */
export const transformAnalysisData = (value: Uint8Array): Highlight[] => {
    const rawData = getFirstJsonObject(value);

    const { rows_affected: _rows_affected, ...highlights } = rawData;

    return Object.entries(highlights).map(([key, title]) => ({
        title: String(title),
        description: HIGHLIGHT_TITLES[key] ?? 'Неизвестный параметр',
    }));
};
