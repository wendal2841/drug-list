import { RestActionType } from 'utils/restActionType';

describe('utils -> restActionType', () => {
    it('restActionType test', () => {
        const expected = {
            DELETE: {
                FAILURE: 'REST_ACTION_RESULT__DELETE__FAILURE',
                REQUEST: 'REST_ACTION_RESULT__DELETE__REQUEST',
                SUCCESS: 'REST_ACTION_RESULT__DELETE__SUCCESS'
            },
            GET: {
                FAILURE: 'REST_ACTION_RESULT__GET__FAILURE',
                REQUEST: 'REST_ACTION_RESULT__GET__REQUEST',
                SUCCESS: 'REST_ACTION_RESULT__GET__SUCCESS'
            },
            POST: {
                FAILURE: 'REST_ACTION_RESULT__POST__FAILURE',
                REQUEST: 'REST_ACTION_RESULT__POST__REQUEST',
                SUCCESS: 'REST_ACTION_RESULT__POST__SUCCESS'
            },
            PUT: {
                FAILURE: 'REST_ACTION_RESULT__PUT__FAILURE',
                REQUEST: 'REST_ACTION_RESULT__PUT__REQUEST',
                SUCCESS: 'REST_ACTION_RESULT__PUT__SUCCESS'
            }
        };

        //When
        const actual = new RestActionType('REST_ACTION_RESULT');

        //Then
        expect(actual).toEqual(expected);
    });
});
