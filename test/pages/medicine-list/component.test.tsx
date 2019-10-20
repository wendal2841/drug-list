import * as React from 'react';
import sinon from 'sinon';
import { MedicineList } from 'pages/medicine-list/component';
import { IPropsMedicineList } from 'pages/medicine-list/types';
import { mount } from 'enzyme';
import { medicineRow } from 'components/medicine-row';

jest.mock(
    'antd',
    () => ({
        List: (props: object): JSX.Element => (<div className="list" {...props} />),
        Button: (props: object): JSX.Element => (<div {...props} />),
    }),
);

describe('pages => medicine-list => component', () => {
    const getMedicineSpy = sinon.spy();
    const defaultProps: IPropsMedicineList = {
        medicineList: [],
        getMedicine: getMedicineSpy,
    };

    it('constructor test', () => {
        //When
        new MedicineList(defaultProps);

        //Then
        expect(getMedicineSpy.calledOnce).toBeTruthy();
    });

    it.each`
        className              | count
        ${'.medicine-list'}    | ${1}
    `('should render $className $count times', ({ className, count }) => {
        //When
        const wrapper = mount<MedicineList>(<MedicineList {...defaultProps} />);
        const element = wrapper.find(className);

        //Then
        expect(element).toHaveLength(count)
    });

    it('should render List', () => {
        //Given
        const wrapper = mount<MedicineList>(<MedicineList {...defaultProps} />);

        //When
        const element = wrapper.find('.list');

        //Then
        expect(element.prop('itemLayout')).toEqual('horizontal');
        expect(element.prop('dataSource')).toEqual(defaultProps.medicineList);
        expect(element.prop('renderItem')).toEqual(medicineRow);
    });

    it('should render Button', () => {
        //Given
        const wrapper = mount<MedicineList>(<MedicineList {...defaultProps} />);

        //When
        const element = wrapper.find('.medicine-list__add-medicine').at(0);

        //Then
        expect(element.prop('type')).toEqual('primary');
        expect(element.text()).toEqual('+');
    });
});
