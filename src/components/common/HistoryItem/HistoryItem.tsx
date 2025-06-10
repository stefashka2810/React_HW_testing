import { HistoryItemType } from '@utils/types';
import { FC } from 'react';

import styles from './HistoryItem.module.css';
import { Text } from '../Text';
import { formatDate } from '@utils/formateDate';
import { Status } from './Status';
import { Trash } from '@components/icons/Trash';
import { File } from '@components/icons/File';
type Props = {
    item: HistoryItemType;
    onDelete: (id: string) => void;
    onClick: (item: HistoryItemType) => void;
};

export const HistoryItem: FC<Props> = ({ item, onClick, onDelete }) => {
    const { timestamp, id, fileName, highlights } = item;

    const date = formatDate(timestamp);

    const hasHighlights = Boolean(highlights);

    const handleDeleteButtonClick = () => {
        onDelete(id);
    };

    const handleItemClick = () => {
        if (!hasHighlights) {
            return;
        }

        onClick(item);
    };

    return (
        <div className={styles.root}>
            <button
                className={styles.item}
                aria-label={`Открыть хайлайты для ${fileName}`}
                onClick={handleItemClick}
            >
                <div className={styles.fileName}>
                    <File />
                    <Text>{fileName}</Text>
                </div>
                <Text>{date}</Text>
                <Status type="success" isActive={hasHighlights} />
                <Status type="error" isActive={!hasHighlights} />
            </button>
            <button
                className={styles.deleteButton}
                aria-label={`Удалить файл ${fileName}`}
                onClick={handleDeleteButtonClick}
            >
                <Trash />
            </button>
        </div>
    );
};
