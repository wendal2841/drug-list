import * as actions from 'entities/medicine/actions';
import { IAction, IActionBase } from 'types';
import { IMedicine } from 'entities/medicine/types';

describe('entities => medicine => actions', () => {
    it('getMedicine test', () => {
        //Given
        const expected: IActionBase = {
            type: 'MEDICINE__GET__REQUEST'
        };

        //When
        const actual = actions.getMedicine();

        //Then
        expect(actual).toEqual(expected);
    });

    it('addMedicine test', () => {
        //Given
        const payload: IMedicine = {
            code: 'code',
            name: 'name',
            price: 100,
            shelfLife: 424352345,
            compositionAndFormOfRelease: 'compositionAndFormOfRelease',
            indication: 'indication',
            contraindications: 'contraindications',
        };
        const expected: IAction<IMedicine> = {
            type: 'MEDICINE__POST__REQUEST',
            payload,
        };

        //When
        const actual = actions.addMedicine(payload);

        //Then
        expect(actual).toEqual(expected);
    });
});
