import {
  inject,
  mergeApplicationConfig,
  provideAppInitializer,
  provideEnvironmentInitializer,
  REQUEST
} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { RenderMode, provideServerRouting } from '@angular/ssr';

export const serverConfig = mergeApplicationConfig(appConfig, {
  providers: [
    provideServerRendering(),
    provideServerRouting([{ path: 'help/**', renderMode: RenderMode.Server }]),
    provideAppInitializer(() => {
      const req = inject(REQUEST);
      console.log('Server App Initializer', req);
    }),
    provideEnvironmentInitializer(() => {
      console.log('Server Environment Initializer');
    }),
  ]
});
