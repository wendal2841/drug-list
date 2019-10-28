import { IMedicine } from 'entities/medicines/types';

export interface IPropsMedicineRow {
    medicine: IMedicine;
    editMedicine(payload: IMedicine): void;
    deleteMedicine(id: string): void;
}
