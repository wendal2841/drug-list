import * as selectors from 'entities/drug/selectors';
import { MockStore } from 'mockDatas/mock-store/mock-store';

describe('entities => drug => selectors', () => {
    it('getDrugs test', () => {
        //Given
        const mockStore = new MockStore();

        //When
        const actual = selectors.getDrugs(mockStore);

        //Then
        expect(actual).toEqual(mockStore.entities.drug.drugs);
    });
});
