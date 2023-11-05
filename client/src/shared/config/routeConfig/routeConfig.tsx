import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { NotFound } from 'pages/common/NotFound';
import { DialogPage } from 'pages/DialogPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    loggedOutOnly?: boolean;
};

export enum AppRoutes {
    MAIN = 'main',
    DIALOG = 'dialog',

    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.DIALOG]: '/dialog',

    // last
    [AppRoutes.NOT_FOUND]: '*',
};

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
        loggedOutOnly: true,
    },
    [AppRoutes.DIALOG]: {
        path: RoutePath.dialog,
        element: <DialogPage />,
        authOnly: true,
    },

    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFound />,
    },
};
