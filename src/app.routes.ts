import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layout/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'entidades',
        loadComponent: () => import('./features/entidades/entidad-list/entidad-list.component').then((m) => m.EntidadListComponent),
      },
      {
        path: 'entidades/nuevo',
        loadComponent: () => import('./features/entidades/entidad-form/entidad-form.component').then((m) => m.EntidadFormComponent),
      },
      {
        path: 'entidades/editar/:id',
        loadComponent: () => import('./features/entidades/entidad-form/entidad-form.component').then((m) => m.EntidadFormComponent),
      },
      {
        path: 'saldos',
        loadComponent: () => import('./features/saldos/saldo-list/saldo-list.component').then((m) => m.SaldoListComponent),
      },
      {
        path: 'saldos/nuevo',
        loadComponent: () => import('./features/saldos/saldo-form/saldo-form.component').then((m) => m.SaldoFormComponent),
      },
      {
        path: 'saldos/editar/:id',
        loadComponent: () => import('./features/saldos/saldo-form/saldo-form.component').then((m) => m.SaldoFormComponent),
      },
      {
        path: 'operaciones',
        loadComponent: () => import('./features/operaciones/operacion-list/operacion-list.component').then((m) => m.OperacionListComponent),
      },
      {
        path: 'operaciones/nuevo',
        loadComponent: () => import('./features/operaciones/operacion-form/operacion-form.component').then((m) => m.OperacionFormComponent),
      },
      {
        path: 'operaciones/editar/:id',
        loadComponent: () => import('./features/operaciones/operacion-form/operacion-form.component').then((m) => m.OperacionFormComponent),
      },
      {
        path: 'reportes',
        loadComponent: () => import('./features/reportes/reporte.component').then((m) => m.ReporteComponent),
      },
      {
        path: 'usuarios',
        canActivate: [adminGuard],
        loadComponent: () => import('./features/usuarios/usuario-list/usuario-list.component').then((m) => m.UsuarioListComponent),
      },
      {
        path: 'usuarios/nuevo',
        canActivate: [adminGuard],
        loadComponent: () => import('./features/usuarios/usuario-form/usuario-form.component').then((m) => m.UsuarioFormComponent),
      },
      {
        path: 'usuarios/editar/:id',
        canActivate: [adminGuard],
        loadComponent: () => import('./features/usuarios/usuario-form/usuario-form.component').then((m) => m.UsuarioFormComponent),
      },
      {
        path: 'perfil',
        loadComponent: () => import('./features/auth/profile/profile.component').then((m) => m.ProfileComponent),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
