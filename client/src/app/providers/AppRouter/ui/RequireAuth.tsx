import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserData } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

interface RequireAuthProps {
    children: JSX.Element;
}
export function RequireAuth({ children }: RequireAuthProps) {
    const auth = useSelector(getUserData);
    const location = useLocation();

    // FIXME сделать роутинг...
    // if (!auth) {
    //     return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
    // }

    return children;
}
