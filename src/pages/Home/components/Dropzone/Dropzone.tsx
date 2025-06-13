

import React, { useRef, useState, useCallback } from 'react';

import { AnalysisStatus } from '@app-types/analysis';
import { Text } from '@components/common/Text';
import { Button } from '@ui/Button';

import { FileDisplay } from '../FileDisplay';

import styles from './Dropzone.module.css';


interface DropzoneProps {
    file: File | null;
    status: AnalysisStatus;
    error: string | null;
    onFileSelect: (file: File) => void;
    onClear: () => void;
}

export const Dropzone: React.FC<DropzoneProps> = ({
    file,
    status,
    error,
    onFileSelect,
    onClear,
}) => {
    const [isDragActive, setIsDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const isProcessing = status === 'processing';

    const handleDragEnter = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();

            if (isProcessing) {
                return;
            }

            setIsDragActive(true);
        },
        [isProcessing]
    );

    const handleDragOver = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
        },
        [isProcessing]
    );

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDragActive(false);
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();

            setIsDragActive(false);

            if (isProcessing) {
                return;
            }

            const droppedFile = e.dataTransfer.files?.[0];

            if (droppedFile) {
                onFileSelect(droppedFile);
            }
        },
        [isProcessing, onFileSelect]
    );

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const selectedFile = e.target.files?.[0];

            if (selectedFile) {
                onFileSelect(selectedFile);
                e.target.value = ''; // Allow re-selecting the same file
            }
        },
        [onFileSelect]
    );

    const handleUploadClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            inputRef.current?.click();
        },
        []
    );

    const handleZoneClick = useCallback(() => {
        if (!file && !isProcessing) {
            inputRef.current?.click();
        }
    }, [file, isProcessing]);

    const renderContent = () => {
        if (isProcessing) {
            return (
                <div className={styles.fileProcessing}>
                    <div className={styles.loader} />
                </div>
            );
        }

        if (file) {
            return (
                <FileDisplay
                    fileName={file.name}
                    onClear={onClear}
                    isCompleted={status === 'completed'}
                    isProcessing={isProcessing}
                />
            );
        }

        return (
            <Button
                type="button"
                variant="upload"
                className={styles.uploadButton}
                onClick={handleUploadClick}
                disabled={isProcessing}
            >
                Загрузить файл
            </Button>
        );
    };

    const renderStatusText = () => {
        if (isProcessing) {
            return 'идёт парсинг файла';
        }

        if (status === 'completed') {
            return 'готово!';
        }

        if (error) {
            return <Text color="error">{error}</Text>;
        }

        if (file) {
            return 'файл загружен!';
        }

        return 'или перетащите сюда';
    };

    return (
        <div
            className={`${styles.dropzone} ${isDragActive ? styles.dragActive : ''}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleZoneClick}
            role="button"
            tabIndex={0}
        >
            <input
                type="file"
                accept=".csv"
                ref={inputRef}
                onChange={handleInputChange}
                hidden
            />

            {renderContent()}

            <div className={styles.fileStatus}>
                <Text size="l">{renderStatusText()}</Text>
            </div>
        </div>
    );
};
