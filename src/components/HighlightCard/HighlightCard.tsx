import React from 'react';

import { Highlight } from '@app-types/analysis';
import { WithClassName } from '@app-types/common';
import { Typography } from '@ui/Typography';
import classNames from 'classnames';

import styles from './HighlightCard.module.css';

type HighlightCardProps = {
    highlight: Highlight;
} & WithClassName;

export const HighlightCard: React.FC<HighlightCardProps> = ({ highlight, className }) => {
    return (
        <div className={classNames(styles.highlightCard, className)}>
            <Typography size="xl" weight="medium">
                {highlight.title}
            </Typography>
            <Typography size="xs">{highlight.description}</Typography>
        </div>
    );
};
