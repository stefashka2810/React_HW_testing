import React from 'react';

import { Highlight } from "@app-types/analysis";
import { Text } from '@components/common/Text';

import styles from './HighlightCard.module.css';


interface HighlightCardProps {
    highlight: Highlight;
}

export const HighlightCard: React.FC<HighlightCardProps> = ({ highlight }) => {
    return (
        <div className={styles.highlightCard}>
            <Text size="xl" weight="medium">
                {highlight.title}
            </Text>
            <Text size="xs">{highlight.description}</Text>
        </div>
    );
}; 