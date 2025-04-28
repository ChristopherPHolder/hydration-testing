import {
  ApplicationConfig,
  provideAppInitializer,
  provideEnvironmentInitializer,
  provideZoneChangeDetection
} from '@angular/core';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(withEventReplay()),
    provideAppInitializer(() => {
      console.log('Client App Initializer');
    }),
    provideEnvironmentInitializer(() => {
      console.log('Client Environment Initializer');
    }),
  ]
};
