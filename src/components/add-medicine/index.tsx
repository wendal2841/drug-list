import React from 'react';
import { IPropsAddMedicine, IStateAddMedicine, STEP } from './types';
import { ModalBase } from 'components/modal-base';
import { StepOneFirmik } from './components/step-one';
import { StepTwoFirmik } from './components/step-two';
import { Formik } from 'formik';
import { INITIAL_VALUES } from './constants';
import { IMedicine } from 'entities/medicines/types';

const initialState: IStateAddMedicine = { step: STEP.one };

export class AddMedicine extends React.PureComponent<IPropsAddMedicine, IStateAddMedicine> {
    state = initialState;

    static getDerivedStateFromProps({ isOpen }: IPropsAddMedicine): IStateAddMedicine | null {
        return isOpen ? null : initialState;
    }

    onSubmit = (value: IMedicine): void => {
        const { addMedicine, editMedicine, onClose } = this.props;

        if (value.id !== undefined) {
            editMedicine(value);
        } else {
            addMedicine(value);
        }

        onClose();
    };
    openStepOne = (): void => this.setState({ step: STEP.one });
    openStepTwo = (): void => this.setState({ step: STEP.two });

    render(): JSX.Element {
        const {
            isOpen,
            medicine,
            onClose,
        } = this.props;
        const { step } = this.state;

        return (
            <ModalBase
                header={`Add/Edit medicine ${step}/2`}
                isOpen={isOpen}
                onClose={onClose}
            >
                <Formik
                    initialValues={medicine || INITIAL_VALUES}
                    onSubmit={this.onSubmit}
                >
                    {
                        step === STEP.one ? (
                            <StepOneFirmik onCancel={onClose} onNext={this.openStepTwo} />
                        ) : (
                            <StepTwoFirmik onCancel={onClose} onPrev={this.openStepOne} />
                        )
                    }
                </Formik>
            </ModalBase>
        )
    }
}
