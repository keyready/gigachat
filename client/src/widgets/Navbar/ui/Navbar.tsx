import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack } from 'shared/UI/Stack';
import classes from './Navbar.module.scss';

export interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    return (
        <HStack maxW justify='center' className={classNames(classes.Navbar, {}, [className])}>
            <h3 className={classes.m0}>GigaChat API</h3>
        </HStack>
    );
});
