import { Routes } from '@angular/router';
import { AuthPage } from './auth/presentation/pages/auth-page/auth-page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/register',
    pathMatch: 'full'
  },
  {
    path: 'auth/register',
    component: AuthPage
  },
  {
    path: '**',
    redirectTo: 'auth/register'
  }
];
