import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HistoryPage.module.css';

interface HistoryItem {
    id: string;
    timestamp: number;
    fileName: string;
    highlights?: string[];
}

export const HistoryPage = () => {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedHistory = localStorage.getItem('tableHistory');
        if (storedHistory) {
            setHistory(JSON.parse(storedHistory));
        }
    }, []);

    const handleClearHistory = () => {
        localStorage.removeItem('tableHistory');
        setHistory([]);
    };

    const handleItemClick = (item: HistoryItem) => {
        // TODO: Implement modal with highlights
        console.log('Show highlights for:', item);
    };

    const handleDeleteItem = (id: string) => {
        const newHistory = history.filter(item => item.id !== id);
        localStorage.setItem('tableHistory', JSON.stringify(newHistory));
        setHistory(newHistory);
    };

    return (
        <div className={styles.container}>
            <h1>История</h1>
            <div className={styles.actions}>
                <button 
                    className={styles.generateButton}
                    onClick={() => navigate('/generate')}
                >
                    Сгенерировать больше
                </button>
                <button 
                    className={styles.clearButton}
                    onClick={handleClearHistory}
                >
                    Очистить историю
                </button>
            </div>
            <div className={styles.historyList}>
                {history.map(item => (
                    <div key={item.id} className={styles.historyItem}>
                        <div 
                            className={styles.itemContent}
                            onClick={() => handleItemClick(item)}
                        >
                            <span>{new Date(item.timestamp).toLocaleString()}</span>
                            <span>{item.fileName}</span>
                        </div>
                        <button
                            className={styles.deleteButton}
                            onClick={() => handleDeleteItem(item.id)}
                        >
                            Удалить
                        </button>
                    </div>
                ))}
                {history.length === 0 && (
                    <p className={styles.emptyMessage}>История пуста</p>
                )}
            </div>
        </div>
    );
}; 