import { Routes } from '@angular/router';
import { Home } from './features/home/pages/home/home';
import { About } from './features/home/pages/about/about';
import { Contact } from './features/home/pages/contact/contact';
import { Register } from './features/home/pages/register/register';
import { authGuard } from './core/guards/auth.guard';
import { NotFound } from './features/home/pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'register', component: Register },
  {
    path: 'products',
    loadComponent: () => import('./features/products/pages/list/list').then((m) => m.List),
    canActivate: [authGuard],
  },
  {
    path: 'product-crud',
    loadComponent: () =>
      import('./products/product-list/product-list.component').then((m) => m.ProductListComponent),
  },
  { path: '**', component: NotFound },
];
