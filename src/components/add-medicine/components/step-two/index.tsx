import * as React from 'react';
import { IPropsStepTwo, IPropsStepTwoFormik } from './types';
import { Button, Input } from 'antd';
import { connect } from 'formik';
import { IFormikMedicineValue } from 'components/add-medicine/types';
const { TextArea } = Input;

export class StepTwo extends React.PureComponent<IPropsStepTwo> {
    onSave = (): void => {
        const { formik: { handleSubmit } } = this.props;

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
                        name="compositionAndFormOfRelease"
                        value={compositionAndFormOfRelease}
                        minLength={0}
                        maxLength={2000}
                        rows={4}
                        onChange={handleChange}
                    />
                </div>
                <div className="step-two__indication" >
                    <span>Indication:</span>
                    <TextArea
                        name="indication"
                        value={indication}
                        minLength={0}
                        maxLength={2000}
                        rows={4}
                        onChange={handleChange}
                    />
                </div>
                <div className="step-two__contraindications" >
                    <span>Contraindication:</span>
                    <TextArea
                        name="contraindications"
                        value={contraindications}
                        minLength={0}
                        maxLength={2000}
                        rows={4}
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
