import { mapStateToProps, mapDispatchToProps } from 'pages/drug-list';
import { IDispatchDrugList } from 'pages/drug-list/types';
import * as actions from 'entities/drug/actions';
import { MockStore } from 'mockDatas/mock-store/mock-store';
import { IStoreDrugList } from 'pages/drug-list/types';

describe('pages => drug-list', () => {
    it('mapStateToProps test', () => {
        //Given
        const mockStore = new MockStore();
        const expected: IStoreDrugList = {
            drugs: mockStore.entities.drug.drugs,
        };

        //Then
        const actual = mapStateToProps(mockStore);

        //Then
        expect(actual).toEqual(expected);
    });

    it('mapDispatchToProps test', () => {
        //Given
        const expected: IDispatchDrugList = {
            getDrugs: actions.getDrugs,
        };

        //Then
        expect(mapDispatchToProps).toEqual(expected);
    });
});
