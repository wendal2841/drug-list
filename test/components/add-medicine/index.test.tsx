import React from 'react';
import sinon from 'sinon';
import { IPropsAddMedicine } from 'components/add-medicine/types';
import { mount } from 'enzyme';
import { AddMedicine } from 'components/add-medicine';

jest.mock(
    'components/modal-base',
    () => ({
        ModalBase: (props: object): JSX.Element => (<div className="modal-base" {...props} />),
    }),
);

describe('components => add-medicines', () => {
    const defaultProps: IPropsAddMedicine = {
        isOpen: false,
        onClose: sinon.spy(),
    };

    it('Should render ModalBase', () => {
        //Given
        const wrapper = mount(<AddMedicine {...defaultProps} />);

        //When
        const element = wrapper.find('.modal-base');

        //Then
        expect(element.prop('header')).toEqual('Add/Edit medicine 1/2');
        expect(element.prop('isOpen')).toEqual(defaultProps.isOpen);
        expect(element.prop('onClose')).toEqual(defaultProps.onClose);
    });
});
