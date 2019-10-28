import * as React from 'react';
import sinon from 'sinon';
import { MedicineList } from 'pages/medicine-list/component';
import { IPropsMedicineList } from 'pages/medicine-list/types';
import { mount } from 'enzyme';

jest.mock(
    'components/medicine-row',
    () => ({
        MedicineRow: (props: object): JSX.Element => (<div className="medicine-row" {...props} />),
    }),
);
jest.mock(
    'components/add-medicine',
    () => ({
        AddMedicine: (props: object): JSX.Element => (<div className="add-medicine-modal" {...props} />),
    }),
);

describe('pages => medicine-list => component', () => {
    const addMedicineSpy = sinon.spy();
    const getMedicineSpy = sinon.spy();

    const defaultProps: IPropsMedicineList = {
        medicineList: [
            {
                code: 'code',
                name: 'name',
                price: 100,
                shelfLife: 424352345,
                compositionAndFormOfRelease: 'compositionAndFormOfRelease',
                indication: 'indication',
                contraindications: 'contraindications',
            }
        ],
        addMedicine: addMedicineSpy,
        getMedicine: getMedicineSpy,
    };

    it('constructor test', () => {
        //Given
        const expectedState = { isOpenModalAdd: false };
        const wrapper = mount<MedicineList>(<MedicineList {...defaultProps} />);

        //When
        const instance = wrapper.instance();

        //Then
        expect(getMedicineSpy.calledOnce).toBeTruthy();
        expect(instance.state).toEqual(expectedState);
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

    it('addMedicine test', () => {
        //Given
        const setStateSpy = sinon.spy();
        const wrapper = mount<MedicineList>(<MedicineList {...defaultProps} />);
        const instance = wrapper.instance();
        sinon.replace(instance, 'setState', setStateSpy);

        //When
        instance.addMedicine();

        //Then
        expect(setStateSpy.calledOnceWithExactly({ isOpenModalAdd: true })).toBeTruthy();
    });

    it('onCloseModalAdd test', () => {
        //Given
        const setStateSpy = sinon.spy();
        const wrapper = mount<MedicineList>(<MedicineList {...defaultProps} />);
        const instance = wrapper.instance();
        sinon.replace(instance, 'setState', setStateSpy);

        //When
        instance.onCloseModalAdd();

        //Then
        expect(setStateSpy.calledOnceWithExactly({ isOpenModalAdd: false })).toBeTruthy();
    });

    it('should render List', () => {
        //Given
        const wrapper = mount<MedicineList>(<MedicineList {...defaultProps} />);

        //When
        const element = wrapper.find('.medicine-row');

        //Then
        expect(element.at(0).prop('code')).toEqual(defaultProps.medicineList[0].code);
        expect(element.at(0).prop('name')).toEqual(defaultProps.medicineList[0].name);
        expect(element.at(0).prop('price')).toEqual(defaultProps.medicineList[0].price);
        expect(element.at(0).prop('shelfLife')).toEqual(defaultProps.medicineList[0].shelfLife);
        expect(element.at(0).prop('compositionAndFormOfRelease')).toEqual(defaultProps.medicineList[0].compositionAndFormOfRelease);
        expect(element.at(0).prop('indication')).toEqual(defaultProps.medicineList[0].indication);
        expect(element.at(0).prop('contraindications')).toEqual(defaultProps.medicineList[0].contraindications);
    });

    it('should render add-medicine', () => {
        //Given
        const wrapper = mount<MedicineList>(<MedicineList {...defaultProps} />);
        const instance = wrapper.instance();

        //When
        const element = wrapper.find('.add-medicine');

        //Then
        expect(element.prop('onClick')).toEqual(instance.addMedicine);
        expect(element.text()).toEqual('+');
    });

    it('should render add-medicine-modal', () => {
        //Given
        const wrapper = mount<MedicineList>(<MedicineList {...defaultProps} />);
        const instance = wrapper.instance();

        //When
        const element = wrapper.find('.add-medicine-modal');

        //Then
        expect(element.prop('isOpen')).toEqual(instance.state.isOpenModalAdd);
        expect(element.prop('onClose')).toEqual(instance.onCloseModalAdd);
    });
});
