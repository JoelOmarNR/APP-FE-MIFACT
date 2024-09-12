import { Routes } from '@angular/router';
import { authGuardFn } from './public/interceptors/auth.guard';
import { LoginComponent } from './public/login/login.component';
import { RegistroComponent } from './public/registro/registro.component';

export const routes: Routes = [
  {
    path: 'page',
    loadChildren: () => import('./page/producto/product.routes'),
    canMatch: [authGuardFn],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'registro',
    component: RegistroComponent,
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
