import { IMedicine } from 'entities/medicines/types';
import { validate } from 'components/add-medicine/validate';

describe('components => add-medicine => validation', () => {
    const value: IMedicine = {
        code: 'code',
        name: 'name',
        price: 100,
        shelfLife: 424352345,
        compositionAndFormOfRelease: 'compositionAndFormOfRelease',
        indication: 'indication',
        contraindications: 'contraindications',
    };
    const getString = (length: number): string => Array.from(Array(length), () => 0).join('');

    it.each`
        code               | expected
        ${''}              | ${'Field "Code" should be more than 4 characters'}
        ${'1234567891011'} | ${'Field "Code" should be less than 10 characters'}
        ${'12345'}         | ${undefined}
    `('validate for field code', ({ code, expected }) => {
        //When
        const actual = validate({ ...value, code });

        //Then
        expect(actual.code).toEqual(expected);
    });

    it.each`
        name                      | expected
        ${''}                     | ${'Field "Name" should be more than 4 characters'}
        ${getString(101)}  | ${'Field "Name" should be less than 100 characters'}
        ${'12345'}                | ${undefined}
    `('validate for field name', ({ name, expected }) => {
        //When
        const actual = validate({ ...value, name });

        //Then
        expect(actual.name).toEqual(expected);
    });

    it.each`
        price       | expected
        ${0.001}    | ${'Field "Price" should be more than 0.01'}
        ${1000001}  | ${'Field "Price" should be less than 1000000'}
        ${10}       | ${undefined}
    `('validate for field price', ({ price, expected }) => {
        //When
        const actual = validate({ ...value, price });

        //Then
        expect(actual.price).toEqual(expected);
    });

    it.each`
        shelfLife    | expected
        ${0}         | ${'Field "Shelf Life" should be more than 0'}
        ${1001}      | ${'Field "Shelf Life" should be less than 1000'}
        ${10}        | ${undefined}
    `('validate for field shelfLife', ({ shelfLife, expected }) => {
        //When
        const actual = validate({ ...value, shelfLife });

        //Then
        expect(actual.shelfLife).toEqual(expected);
    });

    it.each`
        compositionAndFormOfRelease    | expected
        ${getString(2001)}      | ${'Field "Composition and release form" should be less than 2000'}
        ${'test'}                      | ${undefined}
    `('validate for compositionAndFormOfRelease name', ({ compositionAndFormOfRelease, expected }) => {
        //When
        const actual = validate({ ...value, compositionAndFormOfRelease });

        //Then
        expect(actual.compositionAndFormOfRelease).toEqual(expected);
    });

    it.each`
        indication                     | expected
        ${getString(2001)}      | ${'Field "Indication" should be less than 2000'}
        ${'test'}                      | ${undefined}
    `('validate for indication indication', ({ indication, expected }) => {
        //When
        const actual = validate({ ...value, indication });

        //Then
        expect(actual.indication).toEqual(expected);
    });

    it.each`
        contraindications              | expected
        ${getString(2001)}      | ${'Field "Contraindication" should be less than 2000'}
        ${'test'}                      | ${undefined}
    `('validate for contraindications name', ({ contraindications, expected }) => {
        //When
        const actual = validate({ ...value, contraindications });

        //Then
        expect(actual.contraindications).toEqual(expected);
    });
});
