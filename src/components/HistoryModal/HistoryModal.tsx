import { Modal } from '@ui/Modal/Modal';
import { HistoryItemType } from '@utils/types';
import { FC } from 'react';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    historyItem: HistoryItemType | null;
};

export const HistoryModal: FC<Props> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            test
        </Modal>
    );
};
