import { FC } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useHistoryStore } from '@store/historyStore';
import { Modal } from '@ui/Modal/Modal';


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
