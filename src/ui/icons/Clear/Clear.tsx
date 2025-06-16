import { FC } from 'react';

import { IconBaseProps } from '@app-types/common';

export const Clear: FC<IconBaseProps> = ({ size, ...rest }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
    >
        <path
            d="M1.16675 20.3334L10.5001 11.0001M10.5001 11.0001L19.8334 1.66675M10.5001 11.0001L1.16675 1.66675M10.5001 11.0001L19.8334 20.3334"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
