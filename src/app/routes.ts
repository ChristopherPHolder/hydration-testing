import { Component1 } from './components/component-1';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: Component1 },
  { path: '1', component: Component1 },
  { path: '2', loadComponent: ()=> import('./components/component-2').then(m => m.Component2) },
  { path: '3', loadChildren: () => import('./child-routes').then(m => m.childRoutes) },
  { path: '**', redirectTo: '' }
];
