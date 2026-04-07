import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/landing/landing.component')
      .then(m => m.LandingComponent)
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./components/auth/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./components/auth/register/register.component')
      .then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./components/dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },
  {
    path: 'builder',
    canActivate: [authGuard],
    loadComponent: () => import('./components/builder/builder.component')
      .then(m => m.BuilderComponent)
  },
  {
    path: 'portfolio/:shareId',
    loadComponent: () => import('./components/portfolio-view/portfolio-view.component')
      .then(m => m.PortfolioViewComponent)
  },
  { path: '**', redirectTo: '' }
];