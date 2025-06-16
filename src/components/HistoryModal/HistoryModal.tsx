import { FC } from 'react';

import { useHistoryStore } from '@store/historyStore';
import { Modal } from '@ui/Modal/Modal';
import { useShallow } from 'zustand/react/shallow';

export const HistoryModal: FC = () => {
    const { isOpenModal, selectedItem, hideModal } = useHistoryStore(
        useShallow((state) => ({
            isOpenModal: state.isOpenModal,
            selectedItem: state.selectedItem,
            hideModal: state.hideModal,
        }))
    );

    return (
        <Modal isOpen={isOpenModal} onClose={hideModal}>
            {selectedItem?.fileName}
        </Modal>
    );
};
