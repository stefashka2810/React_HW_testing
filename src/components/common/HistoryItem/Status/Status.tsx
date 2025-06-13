import { FC } from 'react';

import { Text } from '@components/common/Text';
import { Smile } from '@components/icons/Smile';
import { SmileSad } from '@components/icons/SmileSad';
import cn from 'classnames';

import styles from './Status.module.css';

type Props = {
    type: 'success' | 'error';
    isActive: boolean;
};
export const Status: FC<Props> = ({ type, isActive }) => {
    return (
        <span className={cn(styles.root, { [styles.active]: isActive })}>
            {type === 'success' ? (
                <>
                    <Text>Обработан успешно</Text>
                    <Smile />
                </>
            ) : (
                <>
                    <Text>Не удалось обработать</Text>
                    <SmileSad />
                </>
            )}
        </span>
    );
};
