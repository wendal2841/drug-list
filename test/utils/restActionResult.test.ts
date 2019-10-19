import { RestActionResult } from 'utils/restActionResult';

describe('utils -> restActionResult', () => {
    it('restActionResult test', () => {
        const expected = {
            FAILURE: 'REST_ACTION_RESULT__FAILURE',
            REQUEST: 'REST_ACTION_RESULT__REQUEST',
            SUCCESS: 'REST_ACTION_RESULT__SUCCESS'
        };

        //When
        const actual = new RestActionResult('REST_ACTION_RESULT');

        //Then
        expect(actual).toEqual(expected);
    });
});
