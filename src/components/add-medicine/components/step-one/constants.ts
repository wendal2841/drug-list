export const FIELDS = {
    CODE: 'code',
    NAME: 'name',
    PRICE: 'price',
    SHELF_LIFE: 'shelfLife'
};

export const VALIDATION = {
    CODE: {
        min: 5,
        max: 10,
    },
    NAME: {
        min: 5,
        max: 100,
    },
    PRICE: {
        min: 0.01,
        max: 1000000,
    },
    SHELF_LIFE: {
        min: 1,
        max: 1000,
    }
};
