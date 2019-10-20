import * as React from 'react';
import { Portal } from 'react-portal';
import { IPropsMedicineModal } from './types';

export const MedicineModal: React.FC<IPropsMedicineModal> = (): JSX.Element => (
    <Portal>
        MedicineModal
    </Portal>
);
