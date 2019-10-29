import { mount } from 'enzyme';
import * as React from 'react';
import getFormikProps from 'mockDatas/formik-props';
import sinon from 'sinon';
import { IPropsStepTwo } from 'components/add-medicine/components/step-two/types';
import { StepTwo } from 'components/add-medicine/components/step-two';

jest.mock(
    'antd',
    () => ({
        Input: ({
            TextArea: (props: object): JSX.Element => (<div className="text-area" {...props} />),
        }),
        Button: (props: object): JSX.Element => (<div {...props} />),
        message: ({
            error: sinon.spy(),
        })
    }),
);

describe('components => add-medicine => components => step-two', () => {
    const defaultProps: IPropsStepTwo = {
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
        onPrev: sinon.spy(),
    };

    it('onSave test', () => {
        //Given
        const handleSubmitSpy = sinon.spy();
        const errors = { code: 'code' };
        const wrapper = mount<StepTwo>(
            <StepTwo
                {...defaultProps}
                formik={{ ...defaultProps.formik, handleSubmit: handleSubmitSpy, errors }}
            />
        );
        const instance = wrapper.instance();

        //When
        instance.onSave();

        //Then
        expect(handleSubmitSpy.calledOnceWithExactly()).toBeTruthy();
    });

    it.each`
        className                                        | count
        ${'.step-two'}                                   | ${1}
        ${'.step-two__composition_and_form_of_release'}  | ${1}
        ${'.step-two__indication'}                       | ${1}
        ${'.step-two__contraindications'}                | ${1}
        ${'.step-two__buttons'}                          | ${1}
    `('should render $className $count times', ({ className, count }) => {
        //Given
        const wrapper = mount(<StepTwo {...defaultProps} />);

        //When
        const element = wrapper.find(className);

        //Then
        expect(element).toHaveLength(count)
    });

    it('Should render TextArea compositionAndFormOfRelease', () => {
        //Given
        const wrapper = mount(<StepTwo {...defaultProps} />);

        //When
        const element = wrapper.find('.text-area').at(0);

        //Then
        expect(element.prop('name')).toEqual('compositionAndFormOfRelease');
        expect(element.prop('value')).toEqual(defaultProps.formik.values.compositionAndFormOfRelease);
        expect(element.prop('minLength')).toEqual(0);
        expect(element.prop('maxLength')).toEqual(2000);
        expect(element.prop('rows')).toEqual(4);
        expect(element.prop('onChange')).toEqual(defaultProps.formik.handleChange);
    });

    it('Should render TextArea indication', () => {
        //Given
        const wrapper = mount(<StepTwo {...defaultProps} />);

        //When
        const element = wrapper.find('.text-area').at(1);

        //Then
        expect(element.prop('name')).toEqual('indication');
        expect(element.prop('value')).toEqual(defaultProps.formik.values.indication);
        expect(element.prop('minLength')).toEqual(0);
        expect(element.prop('maxLength')).toEqual(2000);
        expect(element.prop('rows')).toEqual(4);
        expect(element.prop('onChange')).toEqual(defaultProps.formik.handleChange);
    });

    it('Should render TextArea contraindications', () => {
        //Given
        const wrapper = mount(<StepTwo {...defaultProps} />);

        //When
        const element = wrapper.find('.text-area').at(2);

        //Then
        expect(element.prop('name')).toEqual('contraindications');
        expect(element.prop('value')).toEqual(defaultProps.formik.values.contraindications);
        expect(element.prop('minLength')).toEqual(0);
        expect(element.prop('maxLength')).toEqual(2000);
        expect(element.prop('rows')).toEqual(4);
        expect(element.prop('onChange')).toEqual(defaultProps.formik.handleChange);
    });

    it('Should render Button cancel', () => {
        //Given
        const wrapper = mount<StepTwo>(<StepTwo {...defaultProps} />);

        //When
        const element = wrapper.find('.step-two__cancel').at(0);

        //Then
        expect(element.prop('type')).toEqual('danger');
        expect(element.prop('onClick')).toEqual(defaultProps.onCancel);
        expect(element.text()).toEqual('Cancel');
    });

    it('Should render Button prev', () => {
        //Given
        const wrapper = mount<StepTwo>(<StepTwo {...defaultProps} />);

        //When
        const element = wrapper.find('.step-two__prev').at(0);

        //Then
        expect(element.prop('type')).toEqual('primary');
        expect(element.prop('onClick')).toEqual(defaultProps.onPrev);
        expect(element.text()).toEqual('Prev');
    });

    it('Should render Button add', () => {
        //Given
        const wrapper = mount<StepTwo>(<StepTwo {...defaultProps} />);
        const instance = wrapper.instance();

        //When
        const element = wrapper.find('.step-two__add').at(0);

        //Then
        expect(element.prop('type')).toEqual('primary');
        expect(element.prop('onClick')).toEqual(instance.onSave);
        expect(element.text()).toEqual('Create/Edit');
    });

    it.each`
        index | expected
        ${0}  | ${'Composition and release form:'}
        ${1}  | ${'Indication:'}
        ${2}  | ${'Contraindication:'}
    `('Should render span with text $expected', ({ index, expected }) => {
        //Given
        const wrapper = mount<StepTwo>(<StepTwo {...defaultProps} />);

        //When
        const element = wrapper.find('span').at(index);

        //Then
        expect(element.text()).toEqual(expected);
    });
});
