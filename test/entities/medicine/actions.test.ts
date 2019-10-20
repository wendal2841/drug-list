import * as actions from 'entities/medicine/actions';
import { IActionBase } from 'types';

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
});
