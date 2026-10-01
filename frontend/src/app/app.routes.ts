import { Routes } from '@angular/router';
import { RegisterPage } from './auth/presentation/pages/register-page/register-page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/register',
    pathMatch: 'full'
  },
  {
    path: 'auth/register',
    component: RegisterPage
  },
  {
    path: '**',
    redirectTo: 'auth/register'
  }
];
