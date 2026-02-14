import { Routes } from '@angular/router';
import { Home } from './components/lesson4/home/home';
import { Login } from './components/lesson4/login/login';
import { User } from './components/lesson4/user/user';
import { authGuard } from './services/lesson4/auth.gurad';
import { deactivateGuardGuard } from './services/lesson4/deactivateGuard-guard';

export const routes: Routes = [
    {
        path: '',
        component: Home, // eager loading
  
    },
    {
        path: 'login', 
        component: Login // eager loading
    },
    {
        path: 'users', 
        component: User, // eager loading
        canActivate: [authGuard],
        canDeactivate: [deactivateGuardGuard]
    },
    {
        path: 'users/:id', 
        loadComponent: () =>  // lazy loading
            import('./components/lesson4/user-detail/user-detail')
            .then(c => c.UserDetail)
    }
];
