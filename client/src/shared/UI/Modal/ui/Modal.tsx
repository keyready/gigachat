import React, { Fragment, ReactNode } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from '../../Text';
import { Button } from '../../Button';
import classes from './Modal.module.scss';

interface ModalProps {
    title?: string;
    description?: string;
    children: ReactNode;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    titleAlign?: TextAlign;
    close?: boolean;
    canOverlayClose?: boolean;
    className?: string;
}

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        setIsOpen,
        title,
        description,
        titleAlign = 'center',
        close,
        canOverlayClose = true,
    } = props;

    return (
        <Transition appear as={Fragment} show={isOpen}>
            <Dialog
                as="div"
                className={classNames(classes.Modal, {
                    [classes.unclickableModal]: !canOverlayClose,
                })}
                onClose={() => (canOverlayClose ? setIsOpen(false) : {})}
            >
                <Transition.Child
                    as={Fragment}
                    enter={classes.enterOverlay}
                    enterFrom={classes.enterFromOverlay}
                    enterTo={classes.enterToOverlay}
                    leave={classes.leaveOverlay}
                    leaveFrom={classes.leaveFromOverlay}
                    leaveTo={classes.leaveToOverlay}
                >
                    <div className={classes.overlay} />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter={classes.enter}
                    enterFrom={classes.enterFrom}
                    enterTo={classes.enterTo}
                    leave={classes.leave}
                    leaveFrom={classes.leaveFrom}
                    leaveTo={classes.leaveTo}
                >
                    <div className={classes.wrapper}>
                        <Dialog.Panel className={classNames(classes.ModalPanel, {}, [className])}>
                            {close && (
                                <Button
                                    className={classes.closeBtn}
                                    variant="clear"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Закрыть
                                </Button>
                            )}
                            {title && (
                                <Dialog.Title>
                                    <Text size="large" title={title} align={titleAlign} />
                                </Dialog.Title>
                            )}
                            {description && (
                                <Dialog.Description>
                                    <Text text={description} align={titleAlign} />
                                </Dialog.Description>
                            )}

                            <div className={classes.children}>{children}</div>
                        </Dialog.Panel>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
};
