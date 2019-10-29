import { FormikContext } from 'formik';
import { IFormikMedicineValue } from 'components/add-medicine/types';

export interface IPropsStepOneFormik {
    onCancel(): void;
    onNext(): void;
}

export interface IPropsStepOne extends IPropsStepOneFormik {
    formik: FormikContext<IFormikMedicineValue>;
}
