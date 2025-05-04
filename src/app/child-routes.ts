import { Routes } from '@angular/router';

console.log('childRoutes');

export const childRoutes: Routes = [
  { path: '', loadComponent: ()=> import('./components/component-2').then(m => m.Component2) }
]
