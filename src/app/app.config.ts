import {
  ApplicationConfig, inject,
  provideAppInitializer,
  provideEnvironmentInitializer, providePlatformInitializer,
  provideZoneChangeDetection, REQUEST_CONTEXT
} from '@angular/core';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './routes';
import { logInRouteExploration } from './route-extraction';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(withEventReplay()),
    provideRouter(routes),
    provideAppInitializer(() => {
      const context = inject(REQUEST_CONTEXT);
      console.log('Client App Initializer', context);
      // logInRouteExploration('Client App Initializer');
    }),
    provideEnvironmentInitializer(() => {
      console.log('Client Env Initializer');
    }),
    providePlatformInitializer(() => {
      console.log('Client Platform Initializer')
    })
  ]
};
