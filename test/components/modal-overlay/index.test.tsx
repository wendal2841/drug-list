import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { ModalOverlay } from 'components/modal-overlay';

jest.mock(
    'components/transition-wrapper',
    () => ({
        TransitionWrapper: (props: object): JSX.Element => (<div className="transition-wrapper" {...props} />)
    }),
);

describe('components -> modal-overlay', () => {
    const props = {
        isOpen: false,
        className: 'class',
        onClose: sinon.stub(),
    };

    it('should render TransitionWrapper with props', () => {
        //When
        const transitionWrapper = mount(<ModalOverlay {...props} />).find('.transition-wrapper');

        //Then
        expect(transitionWrapper.prop('isOpen')).toEqual(props.isOpen);
    });

    it('should render classNames', () => {
        //When
        const wrapper = mount(<ModalOverlay {...props} />);

        //Then
        expect(wrapper.find('.class')).toHaveLength(2);
        expect(wrapper.find('.modal-overlay')).toHaveLength(1);
    });

    it('should pass callback', () => {
        //Given
        const wrapper = mount(<ModalOverlay {...props} />);

        //When
        const element = wrapper.find('.modal-overlay');

        //Then
        expect(element).toHaveLength(1);
    });

    it('onKeyDown escape test', () => {
        //Given
        const instance = mount(<ModalOverlay {...props} />).instance() as ModalOverlay;
        const { onKeyDown } = instance;

        const onCloseStub = sinon.stub();
        sinon.replace(instance, 'onClose', onCloseStub);

        //When
        onKeyDown({ code: 'Escape' } as KeyboardEvent);

        //Then
        expect(onCloseStub.calledOnce).toBeTruthy();
    });

    it('onKeyDown escape test', () => {
        //Given
        const instance = mount(<ModalOverlay {...props} />).instance() as ModalOverlay;
        const { onKeyDown } = instance;

        const onCloseStub = sinon.stub();
        sinon.replace(instance, 'onClose', onCloseStub);

        //When
        onKeyDown({ code: 'xz' } as KeyboardEvent);

        //Then
        expect(onCloseStub.called).toBeFalsy();
    });

    it('componentDidMount', () => {
        //Given
        const instance = mount(<ModalOverlay {...props} />).instance() as ModalOverlay;
        const { container, componentDidMount, onKeyDown } = instance;

        const sandbox = sinon.createSandbox();
        const modalRoot = document.createElement('div');
        const appendChildStub = sandbox.stub();
        const addEventListenerStub = sandbox.stub();
        sandbox.replace(modalRoot, 'appendChild', appendChildStub);
        sandbox.replace(instance, 'modalRoot', modalRoot);
        sandbox.replace(window, 'addEventListener', addEventListenerStub);

        //When
        componentDidMount();

        //Then
        expect(appendChildStub.calledOnceWithExactly(container)).toBeTruthy();
        expect(addEventListenerStub.calledOnceWithExactly('keydown', onKeyDown)).toBeTruthy();
    });

    it('componentDidMount null test', () => {
        //Given
        const instance = mount(<ModalOverlay {...props} />).instance() as ModalOverlay;
        const { componentDidMount } = instance;

        const sandbox = sinon.createSandbox();
        const modalRoot = document.createElement('div');
        const appendChildStub = sandbox.stub();
        const addEventListenerStub = sandbox.stub();
        sandbox.replace(modalRoot, 'appendChild', appendChildStub);
        sandbox.replace(instance, 'modalRoot', null);
        sandbox.replace(window, 'addEventListener', addEventListenerStub);

        //When
        componentDidMount();

        //Then
        expect(addEventListenerStub.called).toBeFalsy();
    });

    it('componentWillUnmount', () => {
        //Given
        const instance = mount(<ModalOverlay {...props} />).instance() as ModalOverlay;
        const { container, componentWillUnmount, onKeyDown } = instance;

        const sandbox = sinon.createSandbox();
        const modalRoot = document.createElement('div');
        const removeChildStub = sandbox.stub();
        const removeEventListenerStub = sandbox.stub();
        sandbox.replace(modalRoot, 'removeChild', removeChildStub);
        sandbox.replace(instance, 'modalRoot', modalRoot);
        sandbox.replace(window, 'removeEventListener', removeEventListenerStub);

        //When
        componentWillUnmount();

        //Then
        expect(removeChildStub.calledOnceWithExactly(container)).toBeTruthy();
        expect(removeEventListenerStub.calledOnceWithExactly('keydown', onKeyDown)).toBeTruthy();
    });

    it('componentWillUnmount null test', () => {
        //Given
        const instance = mount(<ModalOverlay {...props} />).instance() as ModalOverlay;
        const { componentWillUnmount } = instance;

        const sandbox = sinon.createSandbox();
        const modalRoot = document.createElement('div');
        const appendChildStub = sandbox.stub();
        const removeEventListenerStub = sandbox.stub();
        sandbox.replace(modalRoot, 'appendChild', appendChildStub);
        sandbox.replace(instance, 'modalRoot', null);
        sandbox.replace(window, 'removeEventListener', removeEventListenerStub);

        //When
        componentWillUnmount();

        //Then
        expect(removeEventListenerStub.called).toBeFalsy();
    });
});
