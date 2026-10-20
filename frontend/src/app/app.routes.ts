import { Routes } from '@angular/router';
import { AuthPage } from './auth/presentation/pages/auth-page/auth-page';

const dashboardLayout = () => import('./dashboard/presentation/components/dashboard-layout/dashboard-layout').then(m => m.DashboardLayout)

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
    path: 'dashboard',
    loadComponent: dashboardLayout
  },
  {
    path: '**',
    redirectTo: 'auth/register'
  }
];
