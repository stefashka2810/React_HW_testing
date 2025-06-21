import { Highlight } from '@app-types/analysis';
import { Highlights } from '@app-types/common';
import { Dropzone } from '@components/Dropzone';
import { HighlightCard } from '@components/HighlightCard';
import { useCsvAnalysis } from '@hooks/use-csv-analysis';
import { useAnalysisStore } from '@store/analysisStore';
import { Button } from '@ui/Button';
import { Typography } from '@ui/Typography';
import { addToHistory } from '@utils/storage';


import styles from './HomePage.module.css';

export const HomePage = () => {
    const { file, status, highlights, error, setFile, setStatus, setHighlights, reset, setError } = useAnalysisStore();

    const onComplete = (highlights?: Highlights) => {
        setStatus('completed');

        if (file) {
            addToHistory({ fileName: file.name, highlights });
        }
    };

    const { analyzeCsv } = useCsvAnalysis({
        onData: setHighlights,
        onComplete,
        onError: (error) => setError(error.message),
    });

    const handleFileSelect = (selectedFile: File) => {
        setFile(selectedFile);
    };

    const handleSend = async () => {
        if (!file || status === 'processing') return;

        setStatus('processing');
        await analyzeCsv(file);
    };

    const isProcessing = status === 'processing';
    const showSendButton = file && !isProcessing && status !== 'completed';

    return (
        <div className={styles.container}>
            <Typography as="h1" size="m" className={styles.title}>
                Загрузите csv файл и получите полную информацию о нём
            </Typography>

            <Dropzone file={file} status={status} error={error} onFileSelect={handleFileSelect} onClear={reset} />

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
                    {highlights.map((highlight: Highlight, index: number) => (
                        <HighlightCard key={index} highlight={highlight} />
                    ))}
                </div>
            ) : (
                <Typography size="l" className={styles.highlightsPlaceholder}>
                    Здесь появятся хайлайты
                </Typography>
            )}
        </div>
    );
};
