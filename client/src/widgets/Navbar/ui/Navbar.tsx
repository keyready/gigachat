import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { HStack } from 'shared/UI/Stack';
import { useSelector } from 'react-redux';
import { UserLogout } from 'features/AuthUser';
import { Button } from 'shared/UI/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppLink } from 'shared/UI/AppLink';
import { getUserData } from 'entities/User';
import classes from './Navbar.module.scss';

export interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const userData = useSelector(getUserData);

    const dispatch = useAppDispatch();
    const handleLogoutClick = useCallback(() => {
        dispatch(UserLogout(userData?.login || ''));
    }, [dispatch, userData]);

    return (
        <HStack maxW justify="between" className={classNames(classes.Navbar, {}, [className])}>
            <AppLink to="/" className={classes.m0}>
                {userData?.name || 'Гига чат'}
            </AppLink>
            {userData && <Button onClick={handleLogoutClick}>Выйти</Button>}
        </HStack>
    );
});
