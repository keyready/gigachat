import { classNames } from 'shared/lib/classNames/classNames';
import { Popover as HPopover, Transition } from '@headlessui/react';
import { ListBoxDirections } from 'shared/types/ui';
import { ReactNode } from 'react';
import { directionsMapper } from '../../styles/consts';
import classes from './Popover.module.scss';
import popupClasses from '../../styles/popups.module.scss';

interface PopoverProps {
    className?: string;
    direction?: ListBoxDirections;
    trigger?: ReactNode;
    children: ReactNode;
}

export const Popover = (props: PopoverProps) => {
    const { className, direction = 'bottom left', trigger, children } = props;

    const menuClasses = [directionsMapper[direction]];

    return (
        <HPopover className={classNames(classes.Popover, {}, [className, popupClasses.popup])}>
            <HPopover.Button className={popupClasses.trigger}>{trigger}</HPopover.Button>

            {/* <Transition */}
            {/*    style={{ zIndex: -1 }} */}
            {/*    enter={classes.enter} */}
            {/*    enterFrom={classes.enterFrom} */}
            {/*    enterTo={classes.enterTo} */}
            {/*    leave={classes.leave} */}
            {/*    leaveFrom={classes.leaveFrom} */}
            {/*    leaveTo={classes.leaveTo} */}
            {/* > */}
            <HPopover.Panel className={classNames(classes.panel, {}, menuClasses)}>
                {children}
            </HPopover.Panel>
            {/* </Transition> */}
        </HPopover>
    );
};
