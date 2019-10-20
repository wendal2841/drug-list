import * as React from 'react';
import { Portal } from 'react-portal';
import { IPropsMedicineModal } from './types';

export const MedicineModal: React.FC<IPropsMedicineModal> = () => (
    <Portal>
        <div>
            MedicineModal
        </div>
    </Portal>
);
