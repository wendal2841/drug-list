import * as selectors from 'entities/medicine/selectors';
import { MockStore } from 'mockDatas/mock-store/mock-store';

describe('entities => medicine => selectors', () => {
    it('getMedicineList test', () => {
        //Given
        const mockStore = new MockStore();

        //When
        const actual = selectors.getMedicineList(mockStore);

        //Then
        expect(actual).toEqual(mockStore.entities.medicine.medicineList);
    });
});
