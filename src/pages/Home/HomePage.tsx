import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import styles from './HomePage.module.css';

export const HomePage = () => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        // TODO: Handle file upload
        console.log(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'text/csv': ['.csv'],
            'application/vnd.ms-excel': ['.xls'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
        }
    });

    return (
        <div className={styles.container}>
            <h1>Загрузка таблицы</h1>
            <div {...getRootProps()} className={styles.dropzone}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Перетащите файл сюда...</p>
                ) : (
                    <p>Перетащите файл или кликните для выбора</p>
                )}
            </div>
        </div>
    );
}; 