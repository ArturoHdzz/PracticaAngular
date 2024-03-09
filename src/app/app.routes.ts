import { Routes } from '@angular/router';
import path from 'path';

export const routes: Routes = [
    { path: 'login', loadComponent:() => import('./bicicletas/login/login.component').then((c) => c.LoginComponent) },
    { path: 'register', loadComponent:() => import('./bicicletas/register/register.component').then((c) => c.RegisterComponent) },
    { path: 'catalogos', loadComponent:() => import('./bicicletas/catalogos/catalogos.component').then((c) => c.CatalogosComponent)},
    { path: 'home', loadComponent:() => import('./bicicletas/home/home.component').then((c) => c.HomeComponent)},
    { path: '**', loadComponent:() => import('./bicicletas/login/login.component').then((c) => c.LoginComponent), pathMatch: 'full' }
];
