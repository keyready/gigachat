import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { HStack } from 'shared/UI/Stack';
import { useSelector } from 'react-redux';
import { getUserData, UserLogout } from 'features/AuthUser';
import { Button } from 'shared/UI/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import classes from './Navbar.module.scss';

export interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const userData = useSelector(getUserData);

    const dispatch = useAppDispatch();
    const handleLogoutClick = useCallback(() => {
        dispatch(UserLogout(userData));
    }, [dispatch, userData]);

    return (
        <HStack maxW justify="between" className={classNames(classes.Navbar, {}, [className])}>
            <h3 className={classes.m0}>{userData.name || 'Гига чат'}</h3>
            {userData.name && <Button onClick={handleLogoutClick}>Выйти</Button>}
        </HStack>
    );
});
