import { FormikContext } from 'formik';
import { IFormikMedicineValue } from 'components/add-medicine/types';

export interface IPropsStepTwoFormik {
    onCancel(): void;
    onPrev(): void;
}

export interface IPropsStepTwo extends IPropsStepTwoFormik {
    formik: FormikContext<IFormikMedicineValue>;
}
