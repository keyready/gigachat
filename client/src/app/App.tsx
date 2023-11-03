import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/AppRouter';
import { Navbar } from 'widgets/Navbar';
import { Suspense, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import Cookie from 'js-cookie';
import { RefreshToken } from 'features/AuthUser';

export const App = () => {
    const { theme } = useTheme();

    const dispatch = useAppDispatch();

    useEffect(() => {
        const cookie = Cookie.get(process.env.REFRESH_TOKEN || '');
        if (cookie) {
            dispatch(RefreshToken(cookie));
        }
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <div className="page">
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
};
