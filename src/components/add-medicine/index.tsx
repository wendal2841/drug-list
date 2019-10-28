import React from 'react';
import { IPropsAddMedicine } from './types';
import { ModalBase } from 'components/modal-base';

export const AddMedicine: React.FC<IPropsAddMedicine> = ({
    isOpen,
    onClose,
}): JSX.Element => (
    <ModalBase
        header="Add/Edit medicine 1/2"
        isOpen={isOpen}
        onClose={onClose}
    >
        AddMedicine
    </ModalBase>
);
