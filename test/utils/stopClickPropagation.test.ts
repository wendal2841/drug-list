import sinon from 'sinon';
import { stopClickPropagation } from 'utils/stopClickPropagation';
import { SyntheticEvent } from 'react';

describe('utils -> stopClickPropagation', () => {
    it('should call stopPropagation', () => {
        //Given
        const event = { stopPropagation: sinon.stub() };

        //When
        stopClickPropagation(event as unknown as SyntheticEvent);

        //Then
        expect(event.stopPropagation.calledOnce).toBeTruthy();
    });
});
