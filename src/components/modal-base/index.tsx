import React from 'react';
import classNames from 'classnames';
import { ModalOverlay } from 'components/modal-overlay';
import { IPropsModalBase } from './types';
import { stopClickPropagation } from 'utils/stopClickPropagation';

export const ModalBase: React.FC<IPropsModalBase> = ({
    isOpen,
    header,
    children,
    className,
    onClose,
}): JSX.Element | null => {
    const modalClassName = classNames('modal-base', className);

    return isOpen ? (
        <ModalOverlay
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className={modalClassName} onClick={stopClickPropagation}>
                <div className="modal-base__header">
                    { header }
                </div>
                <div className="modal-base__body">
                    { children }
                </div>
            </div>
        </ModalOverlay>
    ) : null;
};
