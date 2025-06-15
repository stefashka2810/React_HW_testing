import { useEffect } from 'react';

import { Button } from '@ui/Button';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

// TODO удалить
export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div 
                className={styles.modal} 
                onClick={e => e.stopPropagation()}
            >
                <div className={styles.header}>
                    <h2>{title}</h2>
                    <Button
                        type="button"
                        variant="clear"
                        className={styles.closeButton}
                        onClick={onClose}
                    >
                        ×
                    </Button>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}; 