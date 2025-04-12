// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () => import('./auth/features/sign-in/sign-in.component').then(m => m.SignInComponent)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./auth/features/sign-up/sign-up.component').then(m => m.SignUpComponent)
  },
  {
    path: 'landing-page',
    loadComponent: () => import('./pages/landing-page/landing-page.component').then(m => m.LandingPageComponent)
  },
  {
    path: '',
    redirectTo: 'landing-page',
    pathMatch: 'full'
  }
];
