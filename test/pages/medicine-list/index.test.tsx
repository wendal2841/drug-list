import { mapStateToProps, mapDispatchToProps } from 'pages/medicine-list';
import { IStoreMedicineList, IDispatchMedicineList } from 'pages/medicine-list/types';
import * as actions from 'entities/medicines/actions';
import { MockStore } from 'mockDatas/mock-store/mock-store';

describe('pages => medicines-list', () => {
    it('mapStateToProps test', () => {
        //Given
        const mockStore = new MockStore();
        const expected: IStoreMedicineList = {
            medicines: mockStore.entities.medicines,
        };

        //Then
        const actual = mapStateToProps(mockStore);

        //Then
        expect(actual).toEqual(expected);
    });

    it('mapDispatchToProps test', () => {
        //Given
        const expected: IDispatchMedicineList = {
            getMedicines: actions.getMedicines,
            addMedicine: actions.addMedicine,
            deleteMedicine: actions.deleteMedicine,
        };

        //Then
        expect(mapDispatchToProps).toEqual(expected);
    });
});
