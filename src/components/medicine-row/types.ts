import { IMedicine } from 'entities/medicines/types';

export interface IPropsMedicineRow extends IMedicine {
    deleteMedicine(id: string): void;
}
