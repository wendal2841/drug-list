import { IMedicine } from 'entities/medicines/types';

export interface IPropsAddMedicine {
    isOpen: boolean;
    medicine?: IMedicine;
    addMedicine(payload: IMedicine): void;
    editMedicine(payload: IMedicine): void;
    onClose(): void;
}

export enum STEP {
    one = 1,
    two = 2,
}

export interface IStateAddMedicine {
    step: STEP
}

export interface IFormikMedicineValue extends IMedicine {}
