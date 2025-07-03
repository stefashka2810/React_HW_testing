import { Dropzone } from '@components/Dropzone';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';

describe('Dropzone component', () => {
    let onFileSelect: ReturnType<typeof vi.fn>;
    let onClearFile: ReturnType<typeof vi.fn>;

    const baseProps = {
        file:   null,
        status: 'idle' as const,
        error:  null,
    };

    beforeEach(() => {
        onFileSelect = vi.fn();
        onClearFile  = vi.fn();
        vi.resetAllMocks();
    });

    test('renders upload button and drag hint when idle', () => {
        render(<Dropzone {...baseProps} onFileSelect={onFileSelect} onClear={onClearFile} />);

        const uploadBtn = screen.getByText('Загрузить файл', { selector: 'button' });
        expect(uploadBtn).toBeDefined();

        expect(screen.getByText(/или перетащите сюда \.csv файл/i)).toBeDefined();
    });

    test('handles selecting a CSV via the hidden input', () => {
        const { container } = render(
            <Dropzone {...baseProps} onFileSelect={onFileSelect} onClear={onClearFile} />
        );

        const input = container.querySelector('input[type="file"]') as HTMLInputElement;
        const csv   = new File(['a,b'], 'data.csv', { type: 'text/csv' });

        fireEvent.change(input, { target: { files: [csv] } });
        expect(onFileSelect).toHaveBeenCalledWith(csv);
    });

    test('shows an error message for non-CSV files', () => {
        const { container } = render(
            <Dropzone {...baseProps} onFileSelect={onFileSelect} onClear={onClearFile} />
        );

        const input   = container.querySelector('input[type="file"]') as HTMLInputElement;
        const badFile = new File(['hello'], 'notes.txt', { type: 'text/plain' });

        fireEvent.change(input, { target: { files: [badFile] } });

        expect(
            screen.getByText(/Можно загружать только \*\.csv файлы/i)
        ).toBeDefined();
        expect(onFileSelect).not.toHaveBeenCalled();
    });

    test('accepts drag-and-drop and calls onFileSelect', () => {
        const { container } = render(
            <Dropzone {...baseProps} onFileSelect={onFileSelect} onClear={onClearFile} />
        );

        const dropArea = container.querySelector('div[role="button"]')!;
        const csvFile  = new File(['1,2'], 'report.csv', { type: 'text/csv' });

        fireEvent.dragEnter(dropArea,   { dataTransfer: { files: [] } });
        expect(
            screen.getByText(/Отпустите для загрузки/i)
        ).toBeDefined();

        fireEvent.drop(dropArea, { dataTransfer: { files: [csvFile] } });
        expect(onFileSelect).toHaveBeenCalledWith(csvFile);
    });

    test('displays processing text while status is processing', () => {
        render(
            <Dropzone
                {...baseProps}
                status="processing"
                onFileSelect={onFileSelect}
                onClear={onClearFile}
            />
        );
        expect(screen.getByText(/идёт парсинг файла/i)).toBeDefined();
    });

    test('shows completion text and filename when done', () => {
        const doneFile = new File(['x,y'], 'done.csv', { type: 'text/csv' });
        render(
            <Dropzone
                {...baseProps}
                file={doneFile}
                status="completed"
                onFileSelect={onFileSelect}
                onClear={onClearFile}
            />
        );
        expect(screen.getByText(/готово!/i)).toBeDefined();
        expect(screen.getByText('done.csv')).toBeDefined();
    });

    test('renders server error message when error prop is set', () => {
        const err = 'Ошибка обработки';
        render(
            <Dropzone
                {...baseProps}
                error={err}
                onFileSelect={onFileSelect}
                onClear={onClearFile}
            />
        );
        expect(screen.getByText(err)).toBeDefined();
    });
});
