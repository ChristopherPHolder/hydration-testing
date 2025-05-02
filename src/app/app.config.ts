import {
  ApplicationConfig,
  provideAppInitializer,
  provideEnvironmentInitializer, providePlatformInitializer,
  provideZoneChangeDetection
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
    // provideAppInitializer(() => {
    //
    //   logInRouteExploration('Client App Initializer');
    // }),
    // provideEnvironmentInitializer(() => {
    //   logInRouteExploration('Client Environment Initializer');
    // }),
  ]
};
