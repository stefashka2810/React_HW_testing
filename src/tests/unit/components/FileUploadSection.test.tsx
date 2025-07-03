import { FileUploadSection } from '@components/FileUploadSection';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('FileUploadSection', () => {
    const onFileSelect = vi.fn();
    const onSubmit     = vi.fn();
    const onReset      = vi.fn();
    const props = {
        file:   null,
        status: 'idle' as const,
        error:  null,
        onFileSelect,
        onSend:  onSubmit,
        onClear: onReset,
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('shows the "Загрузить файл" button when no file is chosen', () => {
        render(<FileUploadSection {...props} />);
        const uploadBtn = screen.getByRole('button', { name: 'Загрузить файл' });
        expect(uploadBtn).toBeDefined();
    });

    it('displays the "Отправить" button once a file is provided', () => {
        const testFile = new File(['1,2,3'], 'data.csv', { type: 'text/csv' });
        render(<FileUploadSection {...props} file={testFile} />);
        const sendBtn = screen.getByRole('button', { name: /отправить/i });
        expect(sendBtn).toBeDefined();
    });

    it('invokes the onSend callback when the "Отправить" button is clicked', () => {
        const testFile = new File(['a,b'], 'data.csv', { type: 'text/csv' });
        render(<FileUploadSection {...props} file={testFile} />);
        fireEvent.click(screen.getByRole('button', { name: /отправить/i }));
        expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('does not render the "Отправить" button while status is "processing"', () => {
        const testFile = new File(['x,y'], 'data.csv', { type: 'text/csv' });
        render(<FileUploadSection {...props} file={testFile} status="processing" />);
        const maybeSend = screen.queryByRole('button', { name: /отправить/i });
        expect(maybeSend).toBeNull();
    });
});
