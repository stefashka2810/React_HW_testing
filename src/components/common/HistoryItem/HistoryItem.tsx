
import { FC } from 'react';

import { File } from '@ui/icons/File';
import { Trash } from '@ui/icons/Trash';
import { Typography } from '@ui/Typography';
import { formatDate } from '@utils/formateDate';
import { HistoryItemType } from '@utils/types';

import { Status } from './Status';

import styles from './HistoryItem.module.css';

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
                    <File size={40} className={styles.icon} />
                    <Typography maxRowsNumber={1}>{fileName}</Typography>
                </div>
                <Typography>{date}</Typography>
                <Status type="success" isActive={hasHighlights} />
                <Status type="error" isActive={!hasHighlights} />
            </button>
            <button
                className={styles.deleteButton}
                aria-label={`Удалить файл ${fileName}`}
                onClick={handleDeleteButtonClick}
            >
                <Trash size={33} />
            </button>
        </div>
    );
};
