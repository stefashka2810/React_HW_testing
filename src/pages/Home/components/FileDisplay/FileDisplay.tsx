import React from 'react';

import { Text } from '@components/common/Text';
import { Clear } from '@components/icons/Clear';
import { Button } from '@ui/Button';

import styles from './FileDisplay.module.css';

interface FileDisplayProps {
    fileName: string;
    onClear: () => void;
    isCompleted?: boolean;
    isProcessing?: boolean;
}

export const FileDisplay: React.FC<FileDisplayProps> = ({
    fileName,
    onClear,
    isCompleted,
    isProcessing,
}) => {
    return (
        <div className={styles.fileControls}>
            <div className={styles.fileInfo}>
                <Text
                    className={`${styles.fileName} ${
                        isCompleted ? styles.fileNameCompleted : ''
                    }`}
                >
                    {fileName}
                </Text>
            </div>
            <Button
                type="button"
                variant="clear"
                className={`${styles.clearFileButton} ${styles.customBorder}`}
                onClick={onClear}
                disabled={isProcessing}
            >
                <Clear />
            </Button>
        </div>
    );
}; 