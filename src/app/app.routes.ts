import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { RegistrationComponent } from './modules/registration/registration.component';

export const routes: Routes = [{
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
}, {
    path: '', 
    children: [
        { path: 'users', canActivate: [authGuard], loadChildren: () => import('./modules/users/users.routes') },
        { path: 'login', loadChildren: () => import('./modules/login/login.routes') },
        { path: 'register', component: RegistrationComponent }, 
    ],
}];
