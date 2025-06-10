import { PropsWithChildren } from 'react';
import cn from 'classnames';

import styles from './Text.module.css';

type Props = {
    color?: 'dark' | 'light' | 'purple';
    size?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl';
    as?: 'span' | 'div' | 'p' | 'h1';
    weight?: 'light' | 'regular' | 'medium' | 'bold' | 'extrabold';
    style?: 'normal' | 'italic';
    className?: string;
} & PropsWithChildren;

export const Text = ({
    as: Component = 'p',
    size = 'm',
    weight = 'regular',
    style = 'normal',
    color = 'dark',
    children,
    className,
}: Props) => (
    <Component
        className={cn(
            className,
            styles[`text-size-${size}`],
            styles[`text-weight-${weight}`],
            styles[`text-style-${style}`],
            styles[`text-color-${color}`]
        )}
    >
        {children}
    </Component>
);
