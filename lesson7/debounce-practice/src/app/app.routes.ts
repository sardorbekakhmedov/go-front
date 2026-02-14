import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'search',
        loadComponent: () => import('./search/search').then(x => x.Search)
    }
];
