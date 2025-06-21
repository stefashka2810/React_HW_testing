import React from 'react';

import { Highlight } from '@app-types/analysis';
import { Typography } from '@ui/Typography';

import styles from './HighlightCard.module.css';

interface HighlightCardProps {
    highlight: Highlight;
}

export const HighlightCard: React.FC<HighlightCardProps> = ({ highlight }) => {
    return (
        <div className={styles.highlightCard}>
            <Typography size="xl" weight="medium">
                {highlight.title}
            </Typography>
            <Typography size="xs">{highlight.description}</Typography>
        </div>
    );
};
