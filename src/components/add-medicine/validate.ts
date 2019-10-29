import { IMedicine } from 'entities/medicines/types';
import { IFormikMedicineError } from './types';

export const validate = (value: IMedicine): IFormikMedicineError => {
    const errors: IFormikMedicineError = {};

    if (value.code.length < 5) {
        errors.code = 'Field "Code" should be more than 4 characters';
    } else if (value.code.length > 10) {
        errors.code = 'Field "Code" should be less than 10 characters';
    }

    if (value.name.length < 5) {
        errors.name = 'Field "Name" should be more than 4 characters';
    } else if (value.name.length > 100) {
        errors.name = 'Field "Name" should be less than 100 characters';
    }

    if (value.price < 0.01) {
        errors.price = 'Field "Price" should be more than 0.01';
    } else if (value.price > 1000000) {
        errors.price = 'Field "Price" should be less than 1000000';
    }

    if (value.shelfLife < 1) {
        errors.shelfLife = 'Field "Shelf Life" should be more than 0';
    } else if (value.shelfLife > 1000) {
        errors.shelfLife = 'Field "Shelf Life" should be less than 1000';
    }

    if (value.compositionAndFormOfRelease.length > 2000) {
        errors.compositionAndFormOfRelease = 'Field "Composition and release form" should be less than 2000';
    }

    if (value.indication.length > 2000) {
        errors.indication = 'Field "Indication" should be less than 2000';
    }

    if (value.contraindications.length > 2000) {
        errors.contraindications = 'Field "Contraindication" should be less than 2000';
    }

    return errors;
};
