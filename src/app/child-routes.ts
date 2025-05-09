import { Routes } from '@angular/router';


export const childRoutes: Routes = [
  { path: '', loadComponent: ()=> import('./components/component-2').then(m => m.Component2) }
]
