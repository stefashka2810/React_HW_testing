import { FC } from 'react';

import { Text } from '@components/common/Text';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import styles from './NavElement.module.css';

type Props = {
    to: string;
    title: string;
    end?: boolean;
    icon: React.ReactNode;
};

export const NavElement: FC<Props> = ({ to, title, icon, end = false }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }: { isActive: boolean }) =>
                cn(styles.root, { [styles.active]: isActive })
            }
            end={end}
        >
            {icon}
            <Text size="xs">{title}</Text>
        </NavLink>
    );
};
