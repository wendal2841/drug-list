import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { ModalBase } from 'components/modal-base';
import { stopClickPropagation } from 'utils/stopClickPropagation';

jest.mock(
    'components/modal-overlay',
    () => ({
        ModalOverlay: (props: object): JSX.Element => (<div className="modal-overlay" {...props} />)
    }),
);

describe('components -> modal-base', () => {
    const props = {
        isOpen: true,
        onClose: sinon.stub(),
        header: 'Header text',
        className: 'class-name',
    };

    it('should render modal-overlay with props', () => {
        //When
        const overlay = mount(<ModalBase {...props} />).find('.modal-overlay');

        //Then
        expect(overlay.prop('isOpen')).toEqual(props.isOpen);
        expect(overlay.prop('onClose')).toEqual(props.onClose);
    });

    it('should render class names', () => {
        //When
        const wrapper = mount(<ModalBase {...props} />);

        //Then
        expect(wrapper.find('.modal-base')).toHaveLength(1);
        expect(wrapper.find('.class-name')).toHaveLength(2);
        expect(wrapper.find('.modal-base__header')).toHaveLength(1);
        expect(wrapper.find('.modal-base__body')).toHaveLength(1);
    });

    it('should render header text', () => {
        //Given
        const wrapper = mount(<ModalBase {...props} />);

        //When
        const element = wrapper.find('.modal-base__header');

        //Then
        expect(element.text()).toEqual(props.header);
    });

    it('should render wrapper wick onClick', () => {
        //When
        const wrapperElement = mount(<ModalBase {...props} />).find('.modal-base').get(0);

        //Then
        expect(wrapperElement.props.onClick).toEqual(stopClickPropagation);
    });

    it('should return null if isOpen = false', () => {
        //When
        const actual = ModalBase({
            ...props,
            isOpen: false,
        });

        //Then
        expect(actual).toBeNull();
    });
});
