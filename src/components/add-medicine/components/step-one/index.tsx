import * as React from 'react';
import { IPropsStepOne, IPropsStepOneFormik } from './types';
import { Button, Input, InputNumber } from 'antd';
import { IFormikMedicineValue } from 'components/add-medicine/types';
import { connect } from 'formik';

export class StepOne extends React.PureComponent<IPropsStepOne> {
    onChangePrice = (value: number | undefined): void => {
        const { formik: { handleChange } } = this.props;

        handleChange({ target: { value, id: 'price' } });
    };

    onChangeShelfLife = (value: number | undefined): void => {
        const { formik: { handleChange } } = this.props;

        handleChange({ target: { value, id: 'shelfLife' } });
    };

    render(): JSX.Element {
        const {
            formik: {
                values: {
                    code,
                    name,
                    price,
                    shelfLife,
                },
                handleChange,
            },
            onCancel,
            onNext,
        } = this.props;

        return (
            <div className="step-one" >
                <div className="step-one__code" >
                    <span>Code:</span>
                    <Input
                        name="code"
                        value={code}
                        minLength={5}
                        maxLength={10}
                        onChange={handleChange}
                    />
                </div>
                <div className="step-one__name" >
                    <span>Name:</span>
                    <Input
                        name="name"
                        value={name}
                        minLength={5}
                        maxLength={100}
                        onChange={handleChange}
                    />
                </div>
                <div className="step-one__price" >
                    <span>Price:</span>
                    <InputNumber
                        name="price"
                        value={price}
                        min={0.01}
                        max={1000000}
                        onChange={this.onChangePrice}
                    />
                </div>
                <div className="step-one__shelf-life" >
                    <span>Expiration date:</span>
                    <InputNumber
                        name="shelfLife"
                        value={shelfLife}
                        min={1}
                        max={1000}
                        onChange={this.onChangeShelfLife}
                    />
                </div>
                <div className="step-one__buttons">
                    <Button
                        className="step-one__cancel"
                        type="danger"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="step-one__next"
                        type="primary"
                        onClick={onNext}
                    >
                        Next
                    </Button>
                </div>
            </div>
        );
    }
}

export const StepOneFirmik = connect<IPropsStepOneFormik, IFormikMedicineValue>(StepOne);
