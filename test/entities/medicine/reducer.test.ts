import reducer from 'entities/medicines/reducer';

describe('entities => medicines => reducer', () => {
    const data = {
        state: {
            one: undefined,
            two: undefined,
            three: [
                {
                    code: 'code',
                    name: 'name',
                    price: 100,
                    shelfLife: 424352345,
                    compositionAndFormOfRelease: 'compositionAndFormOfRelease',
                    indication: 'indication',
                    contraindications: 'contraindications',
                },
            ],
        },
        action: {
            one: { type: 'INIT' },
            two: {
                type: 'MEDICINE__GET__SUCCESS',
                payload: [
                    {
                        code: 'code',
                        name: 'name',
                        price: 100,
                        shelfLife: 424352345,
                        compositionAndFormOfRelease: 'compositionAndFormOfRelease',
                        indication: 'indication',
                        contraindications: 'contraindications',
                    }
                ]
            },
            three: {
                type: 'MEDICINE__POST__SUCCESS',
                payload: {
                    code: 'code',
                    name: 'name',
                    price: 100,
                    shelfLife: 424352345,
                    compositionAndFormOfRelease: 'compositionAndFormOfRelease',
                    indication: 'indication',
                    contraindications: 'contraindications',
                }
            }
        },
        expected: {
            one: [],
            two: [
                {
                    code: 'code',
                    name: 'name',
                    price: 100,
                    shelfLife: 424352345,
                    compositionAndFormOfRelease: 'compositionAndFormOfRelease',
                    indication: 'indication',
                    contraindications: 'contraindications',
                }
            ],
            three: [
                {
                    code: 'code',
                    name: 'name',
                    price: 100,
                    shelfLife: 424352345,
                    compositionAndFormOfRelease: 'compositionAndFormOfRelease',
                    indication: 'indication',
                    contraindications: 'contraindications',
                },
                {
                    code: 'code',
                    name: 'name',
                    price: 100,
                    shelfLife: 424352345,
                    compositionAndFormOfRelease: 'compositionAndFormOfRelease',
                    indication: 'indication',
                    contraindications: 'contraindications',
                }
            ]
        }
    };

    it.each`
        state               | action               | expected
        ${data.state.one}   | ${data.action.one}   | ${data.expected.one}
        ${data.state.two}   | ${data.action.two}   | ${data.expected.two}
        ${data.state.three} | ${data.action.three} | ${data.expected.three}
    `('reducer($state, $action) => $expected test', ({ state, action, expected }) => {
        //When
        const actual = reducer(state, action);

        //Then
        expect(actual).toEqual(expected);
    });
});
