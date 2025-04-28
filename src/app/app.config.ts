import { APP_INITIALIZER, ApplicationConfig, ENVIRONMENT_INITIALIZER, provideZoneChangeDetection } from '@angular/core';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(withEventReplay()),
    { provide: APP_INITIALIZER, useValue: () => console.log('Client App Initializer'), multi: true },
    { provide: ENVIRONMENT_INITIALIZER, useValue: () => console.log('Client Environment Initializer'), multi: true },
  ]
};
