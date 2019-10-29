import React from 'react';
import sinon from 'sinon';
import { IPropsAddMedicine } from 'components/add-medicine/types';
import { mount } from 'enzyme';
import { AddMedicine } from 'components/add-medicine';
import { STEP } from 'components/add-medicine/types';
import { validate } from 'components/add-medicine/validate';

jest.mock(
    'components/modal-base',
    () => ({
        ModalBase: (props: object): JSX.Element => (<div className="modal-base" {...props} />),
    }),
);
jest.mock(
    'formik',
    () => ({
        Formik: (props: object): JSX.Element => (<div className="formik" {...props} />),
    }),
);
jest.mock(
    'components/add-medicine/components/step-one',
    () => ({
        StepOneFirmik: (props: object): JSX.Element => (<div className="step-one-firmik" {...props} />),
    }),
);
jest.mock(
    'components/add-medicine/components/step-two',
    () => ({
        StepTwoFirmik: (props: object): JSX.Element => (<div className="step-two-firmik" {...props} />),
    }),
);

describe('components => add-medicines', () => {
    const defaultProps: IPropsAddMedicine = {
        isOpen: false,
        onClose: sinon.spy(),
        editMedicine: sinon.spy(),
        addMedicine: sinon.spy(),
    };

    it('default state', () => {
        //Given
        const wrapper = mount<AddMedicine>(<AddMedicine {...defaultProps} />);
        const expected = { step: STEP.one };

        //When
        const instance = wrapper.instance();

        //Then
        expect(instance.state).toEqual(expected);
    });

    it.each`
        isOpen    | expected
        ${false}  | ${{ step: STEP.one }}
        ${true}   | ${null}
    `('getDerivedStateFromProps test', ({ isOpen, expected }) => {
        //When
        const actual = AddMedicine.getDerivedStateFromProps({ ...defaultProps, isOpen });

        //Then
        expect(actual).toEqual(expected);
    });

    it('onSubmit test when addMedicine', () => {
        //Given
        const addMedicineSpy = sinon.spy();
        const editMedicineSpy = sinon.spy();
        const onCloseSpy = sinon.spy();
        const wrapper = mount<AddMedicine>(
            <AddMedicine
                {...defaultProps}
                addMedicine={addMedicineSpy}
                editMedicine={editMedicineSpy}
                onClose={onCloseSpy}
            />
        );
        const instance = wrapper.instance();
        const value = {
            code: 'code',
            name: 'name',
            price: 100,
            shelfLife: 424352345,
            compositionAndFormOfRelease: 'compositionAndFormOfRelease',
            indication: 'indication',
            contraindications: 'contraindications',
        };

        //When
        instance.onSubmit(value);

        //Then
        expect(addMedicineSpy.calledOnceWithExactly(value)).toBeTruthy();
        expect(editMedicineSpy.calledOnceWithExactly(value)).toBeFalsy();
        expect(onCloseSpy.calledOnceWithExactly()).toBeTruthy();
    });

    it('onSubmit test when editMedicine', () => {
        //Given
        const addMedicineSpy = sinon.spy();
        const editMedicineSpy = sinon.spy();
        const onCloseSpy = sinon.spy();
        const wrapper = mount<AddMedicine>(
            <AddMedicine
                {...defaultProps}
                addMedicine={addMedicineSpy}
                editMedicine={editMedicineSpy}
                onClose={onCloseSpy}
            />
        );
        const instance = wrapper.instance();
        const value = {
            id: 'id',
            code: 'code',
            name: 'name',
            price: 100,
            shelfLife: 424352345,
            compositionAndFormOfRelease: 'compositionAndFormOfRelease',
            indication: 'indication',
            contraindications: 'contraindications',
        };

        //When
        instance.onSubmit(value);

        //Then
        expect(addMedicineSpy.calledOnceWithExactly(value)).toBeFalsy();
        expect(editMedicineSpy.calledOnceWithExactly(value)).toBeTruthy();
        expect(onCloseSpy.calledOnceWithExactly()).toBeTruthy();
    });

    it('openStepOne test', () => {
        //Given
        const setStateSpy = sinon.spy();
        const wrapper = mount<AddMedicine>(<AddMedicine {...defaultProps} />);
        const instance = wrapper.instance();
        sinon.replace(instance, 'setState', setStateSpy);

        //When
        instance.openStepOne();

        //Then
        expect(setStateSpy.calledOnceWithExactly({ step: STEP.one })).toBeTruthy();
    });

    it('openStepOne test', () => {
        //Given
        const setStateSpy = sinon.spy();
        const wrapper = mount<AddMedicine>(<AddMedicine {...defaultProps} />);
        const instance = wrapper.instance();
        sinon.replace(instance, 'setState', setStateSpy);

        //When
        instance.openStepTwo();

        //Then
        expect(setStateSpy.calledOnceWithExactly({ step: STEP.two })).toBeTruthy();
    });

    it.each`
        step        | expected
        ${STEP.one} | ${'Add/Edit medicine 1/2'}
        ${STEP.two} | ${'Add/Edit medicine 2/2'}
    `('Should render ModalBase', ({ step, expected }) => {
        //Given
        const wrapper = mount<AddMedicine>(<AddMedicine {...defaultProps} />);
        const instance = wrapper.instance();

        instance.setState({ step });

        //When
        const element = wrapper.find('.modal-base');

        //Then
        expect(element.prop('header')).toEqual(expected);
        expect(element.prop('isOpen')).toEqual(defaultProps.isOpen);
        expect(element.prop('onClose')).toEqual(defaultProps.onClose);
    });

    it('Should render Formik when medicine == undefined', () => {
        //Given
        const initialValues = {
            code: '',
            name: '',
            price: 0.01,
            shelfLife: 1,
            compositionAndFormOfRelease: '',
            indication: '',
            contraindications: '',
        };
        const wrapper = mount<AddMedicine>(<AddMedicine {...defaultProps} medicine={undefined} />);
        const instance = wrapper.instance();

        //When
        const element = wrapper.find('.formik');

        //Then
        expect(element.prop('initialValues')).toEqual(initialValues);
        expect(element.prop('validate')).toEqual(validate);
        expect(element.prop('onSubmit')).toEqual(instance.onSubmit);
    });

    it('Should render Formik when medicine != undefined', () => {
        //Given
        const medicine = {
            code: '1',
            name: '2',
            price: 0.01,
            shelfLife: 1,
            compositionAndFormOfRelease: '3',
            indication: '4',
            contraindications: '5',
        };
        const wrapper = mount<AddMedicine>(<AddMedicine {...defaultProps} medicine={medicine} />);
        const instance = wrapper.instance();

        //When
        const element = wrapper.find('.formik');

        //Then
        expect(element.prop('initialValues')).toEqual(medicine);
        expect(element.prop('validate')).toEqual(validate);
        expect(element.prop('onSubmit')).toEqual(instance.onSubmit);
    });

    it('Should render StepOneFirmik', () => {
        //Given
        const wrapper = mount<AddMedicine>(<AddMedicine {...defaultProps} />);
        const instance = wrapper.instance();

        //When
        const element = wrapper.find('.step-one-firmik');

        //Then
        expect(element.prop('onCancel')).toEqual(defaultProps.onClose);
        expect(element.prop('onNext')).toEqual(instance.openStepTwo);
    });

    it('Should render StepTwoFirmik', () => {
        //Given
        const wrapper = mount<AddMedicine>(<AddMedicine {...defaultProps} />);
        const instance = wrapper.instance();

        instance.setState({ step: STEP.two });

        wrapper.update();

        //When
        const element = wrapper.find('.step-two-firmik');

        //Then
        expect(element.prop('onCancel')).toEqual(defaultProps.onClose);
        expect(element.prop('onPrev')).toEqual(instance.openStepOne);
    });
});
