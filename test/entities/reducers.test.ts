import * as redux from 'redux';
import sinon from 'sinon';
import medicineReducer from 'entities/medicines/reducer';

it('entitiesReducer test', () => {
    //Given
    const combineReducersSpy = sinon.spy(redux, 'combineReducers');
    const expected = {
        medicines: medicineReducer,
    };

    //When
    require('entities/reducers');

    //Then
    expect(combineReducersSpy.calledOnceWithExactly(expected)).toBeTruthy();
});
