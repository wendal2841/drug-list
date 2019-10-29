import * as React from 'react';
import { mount } from 'enzyme';
import { StepOne } from 'components/add-medicine/components/step-one';
import sinon from 'sinon';
import { IPropsStepOne } from 'components/add-medicine/components/step-one/types';
import getFormikProps from 'mockDatas/formik-props';

jest.mock(
    'antd',
    () => ({
        Button: (props: object): JSX.Element => (<div {...props} />),
        Input: (props: object): JSX.Element => (<div className="input" {...props} />),
        InputNumber: (props: object): JSX.Element => (<div className="input-number" {...props} />),
    }),
);

describe('components => add-medicine => components => step-one', () => {
    const defaultProps: IPropsStepOne = {
        formik: getFormikProps({
            code: 'code',
            name: 'name',
            price: 100,
            shelfLife: 424352345,
            compositionAndFormOfRelease: 'compositionAndFormOfRelease',
            indication: 'indication',
            contraindications: 'contraindications',
        }),
        onCancel: sinon.spy(),
        onNext: sinon.spy(),
    };

    it('onChangePrice test', () => {
        //Given
        const value = 10;
        const handleChangeSpy = sinon.spy();
        const wrapper = mount<StepOne>(
            <StepOne
                { ...defaultProps }
                formik={{ ...defaultProps.formik, handleChange: handleChangeSpy }}
            />
        );
        const instance = wrapper.instance();
        const expected = { target: { value, id: 'price' } };

        //When
        instance.onChangePrice(value);

        //Then
        expect(handleChangeSpy.calledOnceWithExactly(expected)).toBeTruthy();
    });

    it('onChangeShelfLife test', () => {
        //Given
        const value = 20;
        const handleChangeSpy = sinon.spy();
        const wrapper = mount<StepOne>(
            <StepOne
                { ...defaultProps }
                formik={{ ...defaultProps.formik, handleChange: handleChangeSpy }}
            />
        );
        const instance = wrapper.instance();
        const expected = { target: { value, id: 'shelfLife' } };

        //When
        instance.onChangeShelfLife(value);

        //Then
        expect(handleChangeSpy.calledOnceWithExactly(expected)).toBeTruthy();
    });

    it.each`
        className                   | count
        ${'.step-one'}              | ${1}
        ${'.step-one__code'}        | ${1}
        ${'.step-one__name'}        | ${1}
        ${'.step-one__price'}       | ${1}
        ${'.step-one__shelf-life'}  | ${1}
        ${'.step-one__buttons'}     | ${1}
    `('should render $className $count times', ({ className, count }) => {
        //Given
        const wrapper = mount(<StepOne {...defaultProps} />);

        //When
        const element = wrapper.find(className);

        //Then
        expect(element).toHaveLength(count)
    });

    it('Should render Input code', () => {
        //Given
        const wrapper = mount(<StepOne {...defaultProps} />);

        //When
        const element = wrapper.find('.input').at(0);

        //Then
        expect(element.prop('name')).toEqual('code');
        expect(element.prop('value')).toEqual(defaultProps.formik.values.code);
        expect(element.prop('minLength')).toEqual(5);
        expect(element.prop('maxLength')).toEqual(10);
        expect(element.prop('onChange')).toEqual(defaultProps.formik.handleChange);
    });

    it('Should render Input name', () => {
        //Given
        const wrapper = mount(<StepOne {...defaultProps} />);

        //When
        const element = wrapper.find('.input').at(1);

        //Then
        expect(element.prop('name')).toEqual('name');
        expect(element.prop('value')).toEqual(defaultProps.formik.values.name);
        expect(element.prop('minLength')).toEqual(5);
        expect(element.prop('maxLength')).toEqual(100);
        expect(element.prop('onChange')).toEqual(defaultProps.formik.handleChange);
    });

    it('Should render InputNumber price', () => {
        //Given
        const wrapper = mount<StepOne>(<StepOne {...defaultProps} />);
        const instance = wrapper.instance();

        //When
        const element = wrapper.find('.input-number').at(0);

        //Then
        expect(element.prop('name')).toEqual('price');
        expect(element.prop('value')).toEqual(defaultProps.formik.values.price);
        expect(element.prop('min')).toEqual(0.01);
        expect(element.prop('max')).toEqual(1000000);
        expect(element.prop('onChange')).toEqual(instance.onChangePrice);
    });

    it('Should render InputNumber shelfLife', () => {
        //Given
        const wrapper = mount<StepOne>(<StepOne {...defaultProps} />);
        const instance = wrapper.instance();

        //When
        const element = wrapper.find('.input-number').at(1);

        //Then
        expect(element.prop('name')).toEqual('shelfLife');
        expect(element.prop('value')).toEqual(defaultProps.formik.values.shelfLife);
        expect(element.prop('min')).toEqual(1);
        expect(element.prop('max')).toEqual(1000);
        expect(element.prop('onChange')).toEqual(instance.onChangeShelfLife);
    });

    it('Should render Button cancel', () => {
        //Given
        const wrapper = mount<StepOne>(<StepOne {...defaultProps} />);

        //When
        const element = wrapper.find('.step-one__cancel').at(0);

        //Then
        expect(element.prop('type')).toEqual('danger');
        expect(element.prop('onClick')).toEqual(defaultProps.onCancel);
        expect(element.text()).toEqual('Cancel');
    });

    it('Should render Button next', () => {
        //Given
        const wrapper = mount<StepOne>(<StepOne {...defaultProps} />);

        //When
        const element = wrapper.find('.step-one__next').at(0);

        //Then
        expect(element.prop('type')).toEqual('primary');
        expect(element.prop('onClick')).toEqual(defaultProps.onNext);
        expect(element.text()).toEqual('Next');
    });

    it.each`
        index | expected
        ${0}  | ${'Code:'}
        ${1}  | ${'Name:'}
        ${2}  | ${'Price:'}
        ${3}  | ${'Expiration date:'}
    `('Should render span with text $expected', ({ index, expected }) => {
        //Given
        const wrapper = mount<StepOne>(<StepOne {...defaultProps} />);

        //When
        const element = wrapper.find('span').at(index);

        //Then
        expect(element.text()).toEqual(expected);
    });
});
