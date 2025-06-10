import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'download' | 'clear';

type Props = {
    variant?: Variant;
    children: React.ReactNode;
    fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<Props> = ({
    variant = 'primary',
    children,
    fullWidth = false,
    className = '',
    disabled = false,
    ...rest
}) => {
    return (
        <button
            className={classNames(
                styles.button,
                styles[variant],
                {
                    [styles.fullWidth]: fullWidth,
                    [styles.disabled]: disabled,
                },
                className
            )}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    );
};
