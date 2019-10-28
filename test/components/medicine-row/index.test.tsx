import { mount } from 'enzyme';
import { MedicineRow } from 'components/medicine-row';
import * as React from 'react';
import sinon from 'sinon';
import { IPropsMedicineRow } from 'components/medicine-row/types';

jest.mock(
    'antd',
    () => ({
        Button: (props: object): JSX.Element => (<div {...props} />),
    }),
);

describe('components => medicines-row', () => {
    const defaultProps: IPropsMedicineRow =  {
        medicine: {
            id: 'asdfasdfasd',
            code: 'code',
            name: 'name',
            price: 100,
            shelfLife: 424352345,
            compositionAndFormOfRelease: 'compositionAndFormOfRelease',
            indication: 'indication',
            contraindications: 'contraindications',
        },
        editMedicine: sinon.spy(),
        deleteMedicine: sinon.spy(),
    };

    it.each`
        className          | count
        ${'.medicine-row'} | ${1}
    `('should render $className $count times', ({ className, count }) => {
        //When
        const wrapper = mount(<MedicineRow {...defaultProps} />);
        const element = wrapper.find(className);

        //Then
        expect(element).toHaveLength(count)
    });

    it('Should render medicines-row__code', () => {
        //Given
        const wrapper = mount(<MedicineRow {...defaultProps} />);

        //When
        const element = wrapper.find('.medicine-row__code');

        //Then
        expect(element.text()).toEqual('Code: code');
    });

    it('Should render medicines-row__name', () => {
        //Given
        const wrapper = mount(<MedicineRow {...defaultProps} />);

        //When
        const element = wrapper.find('.medicine-row__name');

        //Then
        expect(element.text()).toEqual('Name: name');
    });

    it('Should render medicines-row__price', () => {
        //Given
        const wrapper = mount(<MedicineRow {...defaultProps} />);

        //When
        const element = wrapper.find('.medicine-row__price');

        //Then
        expect(element.text()).toEqual('Price: 100');
    });

    it('Should render medicines-row__edit', () => {
        //Given
        const editMedicineSpy = sinon.spy();
        const wrapper = mount(<MedicineRow {...defaultProps} editMedicine={editMedicineSpy} />);
        const element = wrapper.find('.medicine-row__edit').at(0);
        const expected = {
            ...defaultProps.medicine,
            price: 200,
        };

        //When
        element.prop<() => void>('onClick')();

        //Then
        expect(element.prop('type')).toEqual('primary');
        expect(element.text()).toEqual('Edit');
        expect(editMedicineSpy.calledOnceWithExactly(expected)).toBeTruthy();
    });

    it('Should render medicines-row__delete', () => {
        //Given
        const deleteMedicineSpy = sinon.spy();
        const wrapper = mount(<MedicineRow {...defaultProps} deleteMedicine={deleteMedicineSpy} />);
        const element = wrapper.find('.medicine-row__delete').at(0);

        //When
        element.prop<() => void>('onClick')();

        //Then
        expect(element.prop('type')).toEqual('danger');
        expect(element.text()).toEqual('Delete');
        expect(deleteMedicineSpy.calledOnceWithExactly(defaultProps.medicine.id)).toBeTruthy();
    });
});
