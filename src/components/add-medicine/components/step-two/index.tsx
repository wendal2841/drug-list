import * as React from 'react';
import { IPropsStepTwo, IPropsStepTwoFormik } from './types';
import { Button, Input, message } from 'antd';
import { connect } from 'formik';
import { IFormikMedicineValue } from 'components/add-medicine/types';
import { FIELDS, ROWS, VALIDATION } from './constants';
const { TextArea } = Input;

export class StepTwo extends React.PureComponent<IPropsStepTwo> {
    onSave = (): void => {
        const { formik: { handleSubmit, errors } } = this.props;

        Object
            .entries(errors)
            .forEach(([key, value]) => value !== undefined && message.error(value));

        handleSubmit();
    };

    render(): JSX.Element {
        const {
            formik: {
                values: {
                    compositionAndFormOfRelease,
                    indication,
                    contraindications,
                },
                handleChange,
            },
            onCancel,
            onPrev,
        } = this.props;

        return (
            <div className="step-two" >
                <div className="step-two__composition_and_form_of_release" >
                    <span>Composition and release form:</span>
                    <TextArea
                        name={FIELDS.COMPOSITION_AND_FORM_OF_RELEASE}
                        value={compositionAndFormOfRelease}
                        minLength={VALIDATION.COMPOSITION_AND_FORM_OF_RELEASE.min}
                        maxLength={VALIDATION.COMPOSITION_AND_FORM_OF_RELEASE.max}
                        rows={ROWS}
                        onChange={handleChange}
                    />
                </div>
                <div className="step-two__indication" >
                    <span>Indication:</span>
                    <TextArea
                        name={FIELDS.INDICATION}
                        value={indication}
                        minLength={VALIDATION.INDICATION.min}
                        maxLength={VALIDATION.INDICATION.max}
                        rows={ROWS}
                        onChange={handleChange}
                    />
                </div>
                <div className="step-two__contraindications" >
                    <span>Contraindication:</span>
                    <TextArea
                        name={FIELDS.CONTRAINDICATIONS}
                        value={contraindications}
                        minLength={VALIDATION.CONTRAINDICATIONS.min}
                        maxLength={VALIDATION.CONTRAINDICATIONS.max}
                        rows={ROWS}
                        onChange={handleChange}
                    />
                </div>
                <div className="step-two__buttons">
                    <Button
                        className="step-two__cancel"
                        type="danger"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="step-two__prev"
                        type="primary"
                        onClick={onPrev}
                    >
                        Prev
                    </Button>
                    <Button
                        className="step-two__add"
                        type="primary"
                        onClick={this.onSave}
                    >
                        Create/Edit
                    </Button>
                </div>
            </div>
        )
    }
}

export const StepTwoFirmik = connect<IPropsStepTwoFormik, IFormikMedicineValue>(StepTwo);
