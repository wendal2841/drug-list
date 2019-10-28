import { mount } from 'enzyme';
import { MedicineRow } from 'components/medicine-row';
import * as React from 'react';
import { IMedicine } from 'entities/medicines/types';

jest.mock(
    'antd',
    () => ({
        Button: (props: object): JSX.Element => (<div {...props} />),
    }),
);

describe('components => medicines-row', () => {
    const defaultProps: IMedicine =  {
        code: 'code',
        name: 'name',
        price: 100,
        shelfLife: 424352345,
        compositionAndFormOfRelease: 'compositionAndFormOfRelease',
        indication: 'indication',
        contraindications: 'contraindications',
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
        const wrapper = mount(<MedicineRow {...defaultProps} />);

        //When
        const element = wrapper.find('.medicine-row__edit').at(0);

        //Then
        expect(element.prop('type')).toEqual('primary');
        expect(element.text()).toEqual('Edit');
    });

    it('Should render medicines-row__delete', () => {
        //Given
        const wrapper = mount(<MedicineRow {...defaultProps} />);

        //When
        const element = wrapper.find('.medicine-row__delete').at(0);

        //Then
        expect(element.prop('type')).toEqual('danger');
        expect(element.text()).toEqual('Delete');
    });
});
