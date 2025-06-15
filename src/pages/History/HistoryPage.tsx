import { HistoryItemType } from '@app-types/history';
import { HistoryItem } from '@components/common/HistoryItem';
import { HistoryModal } from '@components/HistoryModal';
import { useHistoryStore } from '@store/historyStore';
import { Button } from '@ui/Button';
import { clearHistory, removeFromHistory } from '@utils/storage';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

import styles from './HistoryPage.module.css';

export const HistoryPage = () => {
    const {
        history,
        showModal,
        setSelectedItem,
        clearHistoryStore,
        removeFromHistoryStore,
    } = useHistoryStore(
        useShallow((state) => ({
            showModal: state.showModal,
            setSelectedItem: state.setSelectedItem,
            clearHistoryStore: state.clearHistory,
            removeFromHistoryStore: state.removeFromHistory,
            history: state.history,
        }))
    );

    const navigate = useNavigate();

    const handleClearHistory = () => {
        clearHistory();
        clearHistoryStore();
    };

    const handleItemClick = (item: HistoryItemType) => {
        setSelectedItem(item);
        showModal();
    };

    const handleDeleteItem = (id: string) => {
        removeFromHistory(id);
        removeFromHistoryStore(id);
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
            <HistoryModal />
        </div>
    );
};
