import * as redux from 'redux';
import sinon from 'sinon';
import medicineReducer from 'entities/medicine/reducer';

it('entitiesReducer test', () => {
    //Given
    const combineReducersSpy = sinon.spy(redux, 'combineReducers');
    const expected = {
        medicine: medicineReducer,
    };

    //When
    require('entities/reducers');

    //Then
    expect(combineReducersSpy.calledOnceWithExactly(expected)).toBeTruthy();
});
