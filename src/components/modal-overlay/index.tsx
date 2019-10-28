import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { TransitionWrapper } from 'components/transition-wrapper';
import { IPropsModalOverlay } from './types';
import { KeyboardCodes } from 'utils/../constants';

export class ModalOverlay extends React.PureComponent<IPropsModalOverlay> {
    container: HTMLDivElement = document.createElement('div');
    modalRoot: HTMLElement | null = document.getElementById('modal-root');

    componentDidMount = (): void => {
        if (!this.modalRoot) {
            return;
        }

        this.modalRoot.appendChild(this.container);
        window.addEventListener('keydown', this.onKeyDown);
    };

    componentWillUnmount = (): void => {
        if (!this.modalRoot) {
            return;
        }

        this.modalRoot && this.modalRoot.removeChild(this.container);
        window.removeEventListener('keydown', this.onKeyDown);
    };

    onKeyDown = (e: KeyboardEvent): void => {
        if (e.code === KeyboardCodes.ESCAPE) {
            this.onClose();
        }
    };

    onClose = (): void => {
        const { onClose } = this.props;

        onClose();
    };

    render(): JSX.Element {
        const {
            isOpen,
            className,
            children,
        } = this.props;

        const overlayClassName = classNames('modal-overlay', className);

        return ReactDOM.createPortal(
            <TransitionWrapper isOpen={isOpen}>
                <div className={overlayClassName} onClick={this.onClose}>
                    { children }
                </div>
            </TransitionWrapper>,
            this.container,
        );
    }
}
