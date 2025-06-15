import React from 'react';

import { Clear } from '@ui/icons/Clear';
import { Button } from '@ui/Button';
import { Typography } from '@ui/Typography';

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
                <Typography
                    className={`${styles.fileName} ${
                        isCompleted ? styles.fileNameCompleted : ''
                    }`}
                >
                    {fileName}
                </Typography>
            </div>
            <Button
                type="button"
                variant="clear"
                className={`${styles.clearFileButton} ${styles.customBorder}`}
                onClick={onClear}
                disabled={isProcessing}
            >
                <Clear size={22} />
            </Button>
        </div>
    );
};
