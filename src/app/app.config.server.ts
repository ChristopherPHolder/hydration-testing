import { APP_INITIALIZER, ENVIRONMENT_INITIALIZER, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

export const serverConfig = mergeApplicationConfig(appConfig, {
  providers: [
    provideServerRendering(),
    { provide: APP_INITIALIZER, useValue: () => console.log('Server App Initializer'), multi: true },
    { provide: ENVIRONMENT_INITIALIZER, useValue: () => console.log('Server Environment Initializer'), multi: true },
  ]
});
