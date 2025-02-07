import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { UserRole, getUserAuthData, getUserRoles } from '@/entities/User';
import { getRouteMain, getRouteNotFound } from '@/shared/const/router';

interface RequireAuthProps { children: JSX.Element, roles?: UserRole[] }

export function RequireAuth({ children, roles }: RequireAuthProps) {
    const auth = useSelector(getUserAuthData);
    const location = useLocation();
    const userRoles = useSelector(getUserRoles);

    const hasReuiredRoles = useMemo(() => {
        if (!roles) {
            return true;
        }

        return roles.some((requireRole) => {
            const hasRole = userRoles?.includes(requireRole);
            return hasRole;
        });
    }, [roles, userRoles]);

    if (!auth) {
        return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
    }

    if (!hasReuiredRoles) {
        return <Navigate to={getRouteNotFound()} state={{ from: location }} replace />;
    }

    return children;
}
