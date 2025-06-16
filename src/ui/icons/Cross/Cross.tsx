import { FC } from 'react';

import { IconBaseProps } from '@app-types/common';

export const Cross: FC<IconBaseProps> = ({ color, size, ...rest }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
    >
        <path
            d="M6.66675 25.3332L16.0001 15.9998M16.0001 15.9998L25.3334 6.6665M16.0001 15.9998L6.66675 6.6665M16.0001 15.9998L25.3334 25.3332"
            stroke={color ?? 'currentColor'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
