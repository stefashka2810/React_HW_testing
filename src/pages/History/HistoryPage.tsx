import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HistoryPage.module.css';
import { HistoryItemType } from '@utils/types';
import { clearHistory, getHistory, removeFromHistory } from '@utils/storage';
import { STORAGE_KEY } from '@utils/consts';
import { HistoryItem } from '@components/common/HistoryItem';
import { Button } from '@ui/Button';
import { HistoryModal } from '@components/HistoryModal';

export const HistoryPage = () => {
    const [history, setHistory] = useState(getHistory);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<HistoryItemType | null>(
        null
    );

    const navigate = useNavigate();

    useEffect(() => {
        const storedHistory = localStorage.getItem(STORAGE_KEY);
        if (storedHistory) {
            setHistory(JSON.parse(storedHistory));
        }
    }, []);

    const handleClearHistory = () => {
        clearHistory();
        setHistory([]);
    };

    const handleItemClick = (item: HistoryItemType) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleDeleteItem = (id: string) => {
        const newHistory = history.filter((item) => item.id !== id);
        removeFromHistory(id);
        setHistory(newHistory);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
        setShowModal(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.list}>
                {history.map((item) => (
                    <HistoryItem
                        key={item.id}
                        item={item}
                        onClick={handleItemClick}
                        onDelete={handleDeleteItem}
                    />
                ))}
            </div>
            <div className={styles.actions}>
                <Button variant="primary" onClick={() => navigate('/generate')}>
                    Сгенерировать больше
                </Button>
                <Button variant="clear" onClick={handleClearHistory}>
                    Очистить всё
                </Button>
            </div>
            <HistoryModal
                isOpen={showModal}
                historyItem={selectedItem}
                onClose={handleCloseModal}
            />
        </div>
    );
};
