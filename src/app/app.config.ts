import {
  ApplicationConfig,
  inject,
  provideEnvironmentInitializer,
  provideZoneChangeDetection,
  REQUEST_CONTEXT
} from '@angular/core';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, ROUTES } from '@angular/router';
import { REQUEST_EXPLORATION } from './request-exploration';
import { routes } from './routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(withEventReplay()),
    { provide: ROUTES, useFactory: () => inject(REQUEST_EXPLORATION) ? [] : routes, multi: true },
    provideRouter([]),
    provideEnvironmentInitializer(() => {
      const requestContext = inject(REQUEST_CONTEXT);
      console.log('appConfig', requestContext);
    }),
  ]
};
