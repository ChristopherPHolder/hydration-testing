import {
  DestroyRef,
  inject,
  mergeApplicationConfig, PLATFORM_INITIALIZER,
  provideAppInitializer,
  provideEnvironmentInitializer, providePlatformInitializer, REQUEST, REQUEST_CONTEXT
} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideServerRouting, RenderMode } from '@angular/ssr';
import { logInRouteExploration } from './route-extraction';

function provideAppDestruction(callback: () => void) {
  return provideAppInitializer(() => {
    inject(DestroyRef).onDestroy(() => callback());
  });
}

export const serverConfig = mergeApplicationConfig(appConfig, {
  providers: [
    provideServerRendering(),
    provideServerRouting([
      { path: '**', renderMode: RenderMode.Server }
    ]),
    // provideAppDestruction(() => {
    //   console.log('******** Destruction **********');
    // }),
    // provideAppInitializer(() => {
    //   // const req = inject(REQUEST);
    //   // const context = inject(REQUEST_CONTEXT);
    //   // console.log('WOLOLO', req, context);
    //   logInRouteExploration('Server App Initializer');
    // }),
    // provideEnvironmentInitializer(() => {
    //   logInRouteExploration('Server Environment Initializer');
    // }),
    providePlatformInitializer(() => {
      console.log('Server Platform Initializer')
    }),
    { provide: PLATFORM_INITIALIZER, multi: true, useFactory: () => {
        console.log('-----> Server Platform Initializer');
      }
    }
  ]
});
