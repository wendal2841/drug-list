import * as selectors from 'entities/medicines/selectors';
import { MockStore } from 'mockDatas/mock-store/mock-store';

describe('entities => medicines => selectors', () => {
    it('getMedicines test', () => {
        //Given
        const mockStore = new MockStore();

        //When
        const actual = selectors.getMedicines(mockStore);

        //Then
        expect(actual).toEqual(mockStore.entities.medicines);
    });
});
