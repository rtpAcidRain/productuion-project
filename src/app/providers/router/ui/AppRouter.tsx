import React, { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutesProps, routeConfig } from '@/shared/config/routeConfig/routeConfig';
import { RequireAuth } from '@/app/providers/router/ui/RequireAuth';
import PageLoader from '@/widgets/PageLoader';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense
                fallback={
                    <PageLoader />
                }
            >
                {route.element}
            </Suspense>

        );
        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly ? <RequireAuth roles={route.roles}>{element}</RequireAuth> : route.element}
            />
        );
    }, []);

    return (
        <Suspense
            fallback={
                <PageLoader />
            }
        >
            <Routes>
                {Object.values(routeConfig).map(renderWithWrapper)}
            </Routes>
        </Suspense>
    );
};

export default memo(AppRouter);
