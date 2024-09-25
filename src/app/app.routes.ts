import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./alumno-list/alumno-list.component')
    },
    {
        path: 'add-alumno',
        loadComponent: () => import('./add-alumno/add-alumno.component')
    },
    {
        path: 'update-alumno/:id',
        loadComponent: () => import('./add-alumno/add-alumno.component')
    }
];
