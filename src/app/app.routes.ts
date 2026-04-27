import { Routes } from '@angular/router';
import { Home } from './features/home/pages/home/home';
import { About } from './features/home/pages/about/about';
import { Contact } from './features/home/pages/contact/contact';
import { Register } from './features/home/pages/register/register';
import { List as ProductList } from './features/products/pages/list/list';
import { NotFound } from './features/home/pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'register', component: Register },
  { path: 'products', component: ProductList },
  { path: '**', component: NotFound },
];
