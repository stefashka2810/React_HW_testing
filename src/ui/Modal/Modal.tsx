import React, { PropsWithChildren } from 'react';

import { Button } from '@ui/Button';
import { Cross } from '@ui/icons/Cross';
import cn from 'classnames';

import { Portal } from '../Portal';

import styles from './Modal.module.css';

type ModalProps = {
    isOpen: boolean;
    onClose?: () => void;
} & PropsWithChildren;

export const Modal: React.FC<ModalProps> = ({ isOpen, children, onClose }) => {
    return (
        <Portal>
            <div
                className={cn(styles.backdrop, {
                    [styles.backdropShown]: isOpen,
                })}
            >
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        {onClose && (
                            <Button
                                variant="clear"
                                className={styles.closeButton}
                                onClick={onClose}
                            >
                                <Cross size={32} />
                            </Button>
                        )}
                    </div>
                    {children}
                </div>
            </div>
        </Portal>
    );
};
