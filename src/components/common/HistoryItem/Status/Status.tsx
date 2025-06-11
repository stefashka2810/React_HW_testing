import { Typography } from '@ui/Typography';
import { Smile } from '@ui/icons/Smile';
import { SmileSad } from '@ui/icons/SmileSad';
import { FC } from 'react';

import styles from './Status.module.css';
import cn from 'classnames';

type Props = {
    type: 'success' | 'error';
    isActive: boolean;
};
export const Status: FC<Props> = ({ type, isActive }) => {
    return (
        <span className={cn(styles.root, { [styles.active]: isActive })}>
            {type === 'success' ? (
                <>
                    <Typography>Обработан успешно</Typography>
                    <Smile />
                </>
            ) : (
                <>
                    <Typography>Не удалось обработать</Typography>
                    <SmileSad />
                </>
            )}
        </span>
    );
};
