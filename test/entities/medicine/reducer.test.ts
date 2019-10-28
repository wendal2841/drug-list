import reducer from 'entities/medicines/reducer';

describe('entities => medicines => reducer', () => {
    describe('INITIAL_STATE', () => {
        const data = {
            state: {
                one: undefined,
            },
            action: {
                one: { type: 'INIT' },
            },
            expected: {
                one: [],
            }
        };

        it.each`
            state               | action               | expected
            ${data.state.one}   | ${data.action.one}   | ${data.expected.one}
        `('reducer($state, $action) => $expected test', ({ state, action, expected }) => {
            //When
            const actual = reducer(state, action);

            //Then
            expect(actual).toEqual(expected);
        });
    });

    describe('MEDICINE__GET__SUCCESS', () => {
        const data = {
            state: {
                one: undefined,
                two: [
                    {
                        code: 'code',
                        name: 'name',
                        price: 200,
                        shelfLife: 424352345,
                        compositionAndFormOfRelease: 'compositionAndFormOfRelease',
                        indication: 'indication',
                        contraindications: 'contraindications',
                    },
                ],
            },
            action: {
                one: {
                    type: 'MEDICINE__GET__SUCCESS',
                    payload: [
                        {
                            code: 'code',
                            name: 'name',
                            price: 200,
                            shelfLife: 424352345,
                            compositionAndFormOfRelease: 'compositionAndFormOfRelease',
                            indication: 'indication',
                            contraindications: 'contraindications',
                        }
                    ]
                },
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
                },
            },
            expected: {
                one: [
                    {
                        code: 'code',
                        name: 'name',
                        price: 200,
                        shelfLife: 424352345,
                        compositionAndFormOfRelease: 'compositionAndFormOfRelease',
                        indication: 'indication',
                        contraindications: 'contraindications',
                    }
                ],
                two: [
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
                ],
            }
        };

        it.each`
            state               | action               | expected
            ${data.state.one}   | ${data.action.one}   | ${data.expected.one}
            ${data.state.two}   | ${data.action.two}   | ${data.expected.two}
        `('reducer($state, $action) => $expected test', ({ state, action, expected }) => {
            //When
            const actual = reducer(state, action);

            //Then
            expect(actual).toEqual(expected);
        });
    });

    describe('MEDICINE__POST__SUCCESS', () => {
        const data = {
            state: {
                one: undefined,
                two: [
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
                one: {
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
                },
                two: {
                    type: 'MEDICINE__POST__SUCCESS',
                    payload: {
                        code: 'code',
                        name: 'name',
                        price: 200,
                        shelfLife: 424352345,
                        compositionAndFormOfRelease: 'compositionAndFormOfRelease',
                        indication: 'indication',
                        contraindications: 'contraindications',
                    }
                }
            },
            expected: {
                one: [
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
                two: [
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
                        price: 200,
                        shelfLife: 424352345,
                        compositionAndFormOfRelease: 'compositionAndFormOfRelease',
                        indication: 'indication',
                        contraindications: 'contraindications',
                    }
                ],
            }
        };

        it.each`
            state               | action               | expected
            ${data.state.one}   | ${data.action.one}   | ${data.expected.one}
            ${data.state.two}   | ${data.action.two}   | ${data.expected.two}
        `('reducer($state, $action) => $expected test', ({ state, action, expected }) => {
            //When
            const actual = reducer(state, action);

            //Then
            expect(actual).toEqual(expected);
        });
    });

    describe('MEDICINE__PUT__SUCCESS', () => {
        const data = {
            state: {
                one: [
                    {
                        id: 'sadfasdfasfasdfasdf',
                        code: 'code',
                        name: 'name',
                        price: 100,
                        shelfLife: 424352345,
                        compositionAndFormOfRelease: 'compositionAndFormOfRelease',
                        indication: 'indication',
                        contraindications: 'contraindications',
                    },
                ],
                two: [
                    {
                        id: 'sadfasdfasfasdfasdf',
                        code: 'code',
                        name: 'name',
                        price: 100,
                        shelfLife: 424352345,
                        compositionAndFormOfRelease: 'compositionAndFormOfRelease',
                        indication: 'indication',
                        contraindications: 'contraindications',
                    },
                    {
                        id: 'asdfasdfasdfasdfasfd',
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
                one: {
                    type: 'MEDICINE__PUT__SUCCESS',
                    payload: {
                        id: 'sadfasdfasfasdfasdf',
                        code: 'code',
                        name: 'name',
                        price: 200,
                        shelfLife: 424352345,
                        compositionAndFormOfRelease: 'compositionAndFormOfRelease',
                        indication: 'indication',
                        contraindications: 'contraindications',
                    }
                },
                two: {
                    type: 'MEDICINE__PUT__SUCCESS',
                    payload: {
                        id: 'asdfasdfasdfasdfasfd',
                        code: 'code',
                        name: 'name',
                        price: 200,
                        shelfLife: 424352345,
                        compositionAndFormOfRelease: 'compositionAndFormOfRelease',
                        indication: 'indication',
                        contraindications: 'contraindications',
                    }
                },
            },
            expected: {
                one: [
                    {
                        id: 'sadfasdfasfasdfasdf',
                        code: 'code',
                        name: 'name',
                        price: 200,
                        shelfLife: 424352345,
                        compositionAndFormOfRelease: 'compositionAndFormOfRelease',
                        indication: 'indication',
                        contraindications: 'contraindications',
                    },
                ],
                two: [
                    {
                        id: 'sadfasdfasfasdfasdf',
                        code: 'code',
                        name: 'name',
                        price: 100,
                        shelfLife: 424352345,
                        compositionAndFormOfRelease: 'compositionAndFormOfRelease',
                        indication: 'indication',
                        contraindications: 'contraindications',
                    },
                    {
                        id: 'asdfasdfasdfasdfasfd',
                        code: 'code',
                        name: 'name',
                        price: 200,
                        shelfLife: 424352345,
                        compositionAndFormOfRelease: 'compositionAndFormOfRelease',
                        indication: 'indication',
                        contraindications: 'contraindications',
                    },
                ],
            }
        };

        it.each`
            state               | action               | expected
            ${data.state.one}   | ${data.action.one}   | ${data.expected.one}
            ${data.state.two}   | ${data.action.two}   | ${data.expected.two}
        `('reducer($state, $action) => $expected test', ({ state, action, expected }) => {
            //When
            const actual = reducer(state, action);

            //Then
            expect(actual).toEqual(expected);
        });
    });

    describe('MEDICINE__DELETE__SUCCESS', () => {
        const data = {
            state: {
                one: undefined,
                two: [
                    {
                        id: 'asdfasdfasdfasdf',
                        code: 'code',
                        name: 'name',
                        price: 100,
                        shelfLife: 424352345,
                        compositionAndFormOfRelease: 'compositionAndFormOfRelease',
                        indication: 'indication',
                        contraindications: 'contraindications',
                    },
                    {
                        id: 'asdfasdfasdfasdf2',
                        code: 'code',
                        name: 'name',
                        price: 100,
                        shelfLife: 424352345,
                        compositionAndFormOfRelease: 'compositionAndFormOfRelease',
                        indication: 'indication',
                        contraindications: 'contraindications',
                    }
                ],
            },
            action: {
                one: {
                    type: 'MEDICINE__DELETE__SUCCESS',
                    payload: 'asdfasdfasdfasdf'
                },
                two: {
                    type: 'MEDICINE__DELETE__SUCCESS',
                    payload: 'asdfasdfasdfasdf'
                },
            },
            expected: {
                one: [],
                two: [
                    {
                        id: 'asdfasdfasdfasdf2',
                        code: 'code',
                        name: 'name',
                        price: 100,
                        shelfLife: 424352345,
                        compositionAndFormOfRelease: 'compositionAndFormOfRelease',
                        indication: 'indication',
                        contraindications: 'contraindications',
                    }
                ],
            }
        };

        it.each`
            state               | action               | expected
            ${data.state.one}   | ${data.action.one}   | ${data.expected.one}
            ${data.state.two}   | ${data.action.two}   | ${data.expected.two}
        `('reducer($state, $action) => $expected test', ({ state, action, expected }) => {
            //When
            const actual = reducer(state, action);

            //Then
            expect(actual).toEqual(expected);
        });
    });
});
