import * as actions from 'entities/drug/actions';
import { IActionBase } from 'types';

describe('entities => drug => actions', () => {
    it('getDrugs test', () => {
        //Given
        const expected: IActionBase = {
            type: 'DRUGS__GET__REQUEST'
        };

        //When
        const actual = actions.getDrugs();

        //Then
        expect(actual).toEqual(expected);
    });
});
