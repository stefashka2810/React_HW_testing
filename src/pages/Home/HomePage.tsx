import { Text } from '@components/common/Text';
import { useCsvAnalysis } from '@hooks/use-csv-analysis';
import { useAnalysisStore } from '@store/analysis-store';
import { Button } from '@ui/Button';
import { addToHistory } from '@utils/storage';

import { Dropzone } from './components/Dropzone';
import { HighlightCard } from './components/HighlightCard';
import styles from './HomePage.module.css';


export const HomePage = () => {
    const {
        file,
        status,
        highlights,
        error,
        setFile,
        setStatus,
        setHighlights,
        reset,
        setError,
    } = useAnalysisStore();

    const { analyzeCsv } = useCsvAnalysis({
        onData: setHighlights,
        onComplete: () => setStatus('completed'),
        onError: (error) => setError(error.message),
    });

    const handleFileSelect = (selectedFile: File) => {
        setFile(selectedFile);
    };

    const handleSend = async () => {
        if (!file || status === 'processing') return;

        setStatus('processing');
        await analyzeCsv(file);
        addToHistory({ fileName: file.name });
    };

    const isProcessing = status === 'processing';
    const showSendButton = file && !isProcessing && status !== 'completed';

    return (
        <div className={styles.container}>
            <Text as="h1" size="m" className={styles.title}>
                Загрузите csv файл и получите полную информацию
            </Text>

            <Dropzone
                file={file}
                status={status}
                error={error}
                onFileSelect={handleFileSelect}
                onClear={reset}
            />

            {showSendButton && (
                <Button
                    type="button"
                    variant="primary"
                    disabled={!file}
                    onClick={handleSend}
                    className={styles.sendButton}
                >
                    Отправить
                </Button>
            )}

            {highlights.length > 0 ? (
                <div className={styles.highlightsGrid}>
                    {highlights.map((highlight, index) => (
                        <HighlightCard key={index} highlight={highlight} />
                    ))}
                </div>
            ) : (
                <Text size="l" className={styles.highlightsPlaceholder}>
                    Здесь появятся хайлайты
                </Text>
            )}
        </div>
    );
};
