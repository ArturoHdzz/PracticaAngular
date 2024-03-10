import { Routes } from '@angular/router';
import path from 'path';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', loadComponent:() => import('./bicicletas/login/login.component').then((c) => c.LoginComponent) },
    { path: 'register', loadComponent:() => import('./bicicletas/register/register.component').then((c) => c.RegisterComponent) },
    { path: 'codigo', loadComponent:() => import('./bicicletas/codigo/codigo.component').then((c) => c.CodigoComponent) },
    { path: 'layout', loadComponent:() => import('./bicicletas/layout/layout.component').then((c) => c.LayoutComponent), children:[
        { path: 'catalogos', loadComponent:() => import('./bicicletas/catalogos/catalogos.component').then((c) => c.CatalogosComponent)},
        { path: 'home', loadComponent:() => import('./bicicletas/home/home.component').then((c) => c.HomeComponent)},
        { path: 'compras', loadComponent:() => import('./bicicletas/compras/compras.component').then((c) => c.ComprasComponent)},
        { path: 'detallecompras', loadComponent:() => import('./bicicletas/detallecompras/detallecompras.component').then((c) => c.DetallecomprasComponent) },
        { path: 'detallepedidos', loadComponent:() => import('./bicicletas/detallepedidos/detallepedidos.component').then((c) => c.DetallepedidosComponent) },
        { path: 'favoritos', loadComponent:() => import('./bicicletas/favoritos/favoritos.component').then((c) => c.FavoritosComponent) },
        { path: 'items', loadComponent:() => import('./bicicletas/items/items.component').then((c) => c.ItemsComponent) },
        { path: 'metodopagos', loadComponent:() => import('./bicicletas/metodopagos/metodopagos.component').then((c) => c.MetodopagosComponent) },
        { path: 'modelos', loadComponent:() => import('./bicicletas/modelos/modelos.component').then((c) => c.ModelosComponent) },
        { path: 'pedidos', loadComponent:() => import('./bicicletas/pedidos/pedidos.component').then((c) => c.PedidosComponent) },
        { path: 'resenas', loadComponent:() => import('./bicicletas/resenas/resenas.component').then((c) => c.ResenasComponent) },
        { path: 'users', loadComponent:() => import('./bicicletas/users/users.component').then((c) => c.UsersComponent)},
        { path: '**', loadComponent:() => import('./bicicletas/home/home.component').then((c) => c.HomeComponent), pathMatch: 'full' }
    ], canActivate: [authGuard]},
    { path: '**', loadComponent:() => import('./bicicletas/login/login.component').then((c) => c.LoginComponent), pathMatch: 'full' }
];
