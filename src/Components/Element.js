import React, { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import EmptyHome from './EmptyHome';

const LazyFormList = lazy(() => import('./FormList/FormList'));
const LazyCreateForm = lazy(() => import('./CreateForm/CreateForm'));

function Element() {

    const routes = useRoutes([
        {
            path: '/',
            element: <EmptyHome />,
            children: [
                {
                    path: '',
                    element: <Navigate replace to="create-form" />
                },
                {
                    path: 'create-form',
                    element: <LazyCreateForm />
                },
                {
                    path: 'form-list',
                    element: <LazyFormList />
                }
            ]
        }
    ]);

    return routes;
}

export default Element;
