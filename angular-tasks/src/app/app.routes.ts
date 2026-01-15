import { Routes } from '@angular/router';
import { Home } from './components/lesson4/home/home';
import { Login } from './components/lesson4/login/login';
import { User } from './components/lesson4/user/user';
import { UserDetail } from './components/lesson4/user-detail/user-detail';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'login', component: Login},
    {path: 'users', component: User},
    {path: 'users/:id', component: UserDetail}
];
