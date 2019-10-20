import * as React from 'react';
import { mount } from 'enzyme';
import { IPropsMedicineModal } from 'components/medicine-modal/types';
import { MedicineModal } from 'components/medicine-modal';

jest.mock(
    'react-portal',
    () => ({
        Portal: (props: object): JSX.Element => (<div className="portal" {...props} />),
    }),
);

describe('components => medicine-modal', () => {
    const defaultProps: IPropsMedicineModal = {};

    it('Should render Portal', () => {
        //Given
        const wrapper = mount(<MedicineModal {...defaultProps} />);

        //When
        const element = wrapper.find('.portal');

        //Then
        expect(element).toHaveLength(1);
    });
});
