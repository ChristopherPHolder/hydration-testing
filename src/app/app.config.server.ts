import { mergeApplicationConfig, provideAppInitializer, provideEnvironmentInitializer } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { RenderMode, provideServerRouting } from '@angular/ssr';

export const serverConfig = mergeApplicationConfig(appConfig, {
  providers: [
    provideServerRendering(),
    provideServerRouting([{ path: '**', renderMode: RenderMode.Server }]),
    provideAppInitializer(() => {
      console.log('Server App Initializer');
    }),
    provideEnvironmentInitializer(() => {
      console.log('Server Environment Initializer');
    }),
  ]
});
