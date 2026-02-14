import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: '', 
        loadComponent: () => import('./rx-js-test/rx-js-test').then(m => m.RxJsTest)
    },
    { 
        path: 'test', 
        loadComponent: () => import('./rx-js-test/rx-js-test').then(m => m.RxJsTest)
    },
    { 
        path: 'test2', 
        loadComponent: () => import('./rx-js-test2/rx-js-test2').then(m => m.RxJsTest2)
    },
    {
        path: 'subs',
        loadComponent: () => import('./subscription/subscription').then(s => s.SubscriptionComponent)
    },
    {
        path: 'newpipe',
        loadComponent: () => import('./new-pipe/new-pipe').then(p => p.NewPipe)
    }
];
