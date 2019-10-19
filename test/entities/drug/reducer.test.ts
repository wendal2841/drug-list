import reducer from 'entities/drug/reducer';

describe('entities => drug => reducer', () => {
    const data = {
        state: {
            one: undefined,
        },
        action: {
            one: { type: 'INIT' }
        },
        expected: {
            one: {
                drugs: [],
            }
        }
    };

    it.each`
        state             | action             | expected
        ${data.state.one} | ${data.action.one} | ${data.expected.one}
    `('reducer($state, $action) => $expected test', ({ state, action, expected }) => {
        //When
        const actual = reducer(state, action);

        //Then
        expect(actual).toEqual(expected);
    });
});
