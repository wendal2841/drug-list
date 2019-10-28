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

describe('pages => medicines-list => component', () => {
    const getMedicinesSpy = sinon.spy();
    const addMedicineSpy = sinon.spy();
    const editMedicineSpy = sinon.spy();
    const deleteMedicineSpy = sinon.spy();

    const defaultProps: IPropsMedicineList = {
        medicines: [
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
        getMedicines: getMedicinesSpy,
        addMedicine: addMedicineSpy,
        editMedicine: editMedicineSpy,
        deleteMedicine: deleteMedicineSpy,
    };

    it('constructor test', () => {
        //Given
        const expectedState = { isOpenModalAdd: false };
        const wrapper = mount<MedicineList>(<MedicineList {...defaultProps} />);

        //When
        const instance = wrapper.instance();

        //Then
        expect(getMedicinesSpy.calledOnce).toBeTruthy();
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
        expect(element.at(0).prop('medicine')).toEqual(defaultProps.medicines[0]);
        expect(element.at(0).prop('editMedicine')).toEqual(defaultProps.editMedicine);
        expect(element.at(0).prop('deleteMedicine')).toEqual(defaultProps.deleteMedicine);
    });

    it('should render add-medicines', () => {
        //Given
        const wrapper = mount<MedicineList>(<MedicineList {...defaultProps} />);
        const instance = wrapper.instance();

        //When
        const element = wrapper.find('.add-medicine');

        //Then
        expect(element.prop('onClick')).toEqual(instance.addMedicine);
        expect(element.text()).toEqual('+');
    });

    it('should render add-medicines-modal', () => {
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
