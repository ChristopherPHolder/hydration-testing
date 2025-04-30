import { Component1 } from './components/component-1';
import { Routes } from '@angular/router';
import { logInRouteExploration } from './route-extraction';


export const routes: Routes = [
  {
    path: '',
    component: Component1,
    canMatch: [
      () => {
        logInRouteExploration('canMatch route /');
        return true;
      }
    ]
  },
  {
    path: '1',
    component: Component1,
    canMatch: [
      () => {
        logInRouteExploration('canMatch route 1');
        return true;
      }
    ]
  },
  {
    path: '2',
    loadComponent: ()=> import('./components/component-2').then(m => m.Component2),
    canMatch: [
      () => {
        logInRouteExploration('canMatch route 2');
        return true;
      }
    ]
  },
  {
    path: '3',
    loadChildren: () => import('./child-routes').then(m => m.childRoutes),
    canMatch: [
      () => {
        logInRouteExploration('canMatch route 3');
        return true;
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
