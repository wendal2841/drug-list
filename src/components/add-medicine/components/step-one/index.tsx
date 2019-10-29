import * as React from 'react';
import { IPropsStepOne, IPropsStepOneFormik } from './types';
import { Button, Input, InputNumber } from 'antd';
import { IFormikMedicineValue } from 'components/add-medicine/types';
import { connect } from 'formik';
import { FIELDS, VALIDATION } from './constants';

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
                        name={FIELDS.CODE}
                        value={code}
                        minLength={VALIDATION.CODE.min}
                        maxLength={VALIDATION.CODE.max}
                        onChange={handleChange}
                    />
                </div>
                <div className="step-one__name" >
                    <span>Name:</span>
                    <Input
                        name={FIELDS.NAME}
                        value={name}
                        minLength={VALIDATION.NAME.min}
                        maxLength={VALIDATION.NAME.max}
                        onChange={handleChange}
                    />
                </div>
                <div className="step-one__price" >
                    <span>Price:</span>
                    <InputNumber
                        name={FIELDS.PRICE}
                        value={price}
                        min={VALIDATION.PRICE.min}
                        max={VALIDATION.PRICE.max}
                        onChange={this.onChangePrice}
                    />
                </div>
                <div className="step-one__shelf-life" >
                    <span>Expiration date:</span>
                    <InputNumber
                        name={FIELDS.SHELF_LIFE}
                        value={shelfLife}
                        min={VALIDATION.SHELF_LIFE.min}
                        max={VALIDATION.SHELF_LIFE.max}
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
