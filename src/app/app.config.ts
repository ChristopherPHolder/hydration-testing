import {
  ApplicationConfig,
  inject, provideAppInitializer,
  provideEnvironmentInitializer,
  provideZoneChangeDetection,
  REQUEST_CONTEXT,
  ɵENABLE_ROOT_COMPONENT_BOOTSTRAP
} from '@angular/core';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, ROUTES } from '@angular/router';
import { } from '@angular/ssr';
import { REQUEST_EXPLORATION } from './request-exploration';
import { routes } from './routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      // @ts-ignore
      console.log('App Initializing...', globalThis['route_exploration']);
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(withEventReplay()),
    { provide: ROUTES, useFactory: () => inject(REQUEST_EXPLORATION) ? [{ path: '**', children: [] },] : routes, multi: true },
    provideRouter([]),
    provideEnvironmentInitializer(() => {
      const requestContext = inject(REQUEST_CONTEXT);
      // console.log('appConfig', requestContext);
    }),
  ]
};
