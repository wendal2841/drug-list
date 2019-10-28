import { mapStateToProps, mapDispatchToProps } from 'pages/medicine-list';
import { IStoreMedicineList, IDispatchMedicineList } from 'pages/medicine-list/types';
import * as actions from 'entities/medicine/actions';
import { MockStore } from 'mockDatas/mock-store/mock-store';

describe('pages => medicine-list', () => {
    it('mapStateToProps test', () => {
        //Given
        const mockStore = new MockStore();
        const expected: IStoreMedicineList = {
            medicineList: mockStore.entities.medicine.medicineList,
        };

        //Then
        const actual = mapStateToProps(mockStore);

        //Then
        expect(actual).toEqual(expected);
    });

    it('mapDispatchToProps test', () => {
        //Given
        const expected: IDispatchMedicineList = {
            getMedicine: actions.getMedicine,
            addMedicine: actions.addMedicine,
        };

        //Then
        expect(mapDispatchToProps).toEqual(expected);
    });
});
