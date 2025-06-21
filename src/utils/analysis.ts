import { Highlight } from '@app-types/analysis';
import { HIGHLIGHT_TITLES } from '@utils/consts';

import { Highlights } from '../types/common';

/**
 * Custom error for invalid server responses
 */
export class InvalidServerResponseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidServerResponseError';
    }
}
/**
 * Parses the streaming response from the server.
 * @param value The streamed data chunk.
 * @returns The first JSON object from the chunk.
 */
const getFirstJsonObject = (value: Uint8Array): Record<string, string | number> => {
    const decoder = new TextDecoder();
    const textChunk = decoder.decode(value).split('\n')[0];
    return JSON.parse(textChunk);
};

/**
 * Преобразует потоковые данные API в объект хайлайтов.
 * @param value Потоковые данные в формате Uint8Array.
 * @returns.highlights Сырые данные хайлайтов в формате Highlights.
 * @returns.highlightsToStore Массив отформатированных объектов Highlight с полями title и description.
 */
export const transformAnalysisData = (
    value: Uint8Array
): {
    highlights: Highlights;
    highlightsToStore: Highlight[];
} => {
    const rawData = getFirstJsonObject(value);

    // TODO: remove this after server validation will be fixed
    if (!validateServerResponse(rawData)) {
        throw new InvalidServerResponseError('Файл не был корректно обработан на сервере :(');
    }

    const { rows_affected: _rows_affected, ...highlights } = rawData;

    const highlightsToStore = convertHighlightsToArray(highlights as Highlights);

    return { highlights: highlights as Highlights, highlightsToStore };
};

/**
 * Преобразует объект Highlights в массив объектов Highlight.
 * @param highlights Объект с данными хайлайтов типа Highlights.
 * @returns Массив объектов Highlight с полями title и description.
 */
export const convertHighlightsToArray = (highlights: Highlights): Highlight[] => {
    return Object.entries(highlights).map(([key, title]) => ({
        title: String(title),
        description: HIGHLIGHT_TITLES[key] ?? 'Неизвестный параметр',
    }));
};

/**
 * Check if file is csv
 * @param file - File to check
 * @returns True if file is csv, false otherwise
 */
export const isCsvFile = (file: File): boolean => {
    return file.name.toLowerCase().endsWith('.csv');
};
/**
 * Validate server response
 * @param rawData - Raw data from server
 * @returns True if response is valid, false otherwise
 */
export const validateServerResponse = (rawData: Record<string, string | number>) => {
    const validHighlightKeys = Object.keys(HIGHLIGHT_TITLES);
    const responseHighlightKeys = Object.keys(rawData);

    return validHighlightKeys.some((key) => responseHighlightKeys.includes(key));
};
