import { DestroyRef, inject, mergeApplicationConfig, provideAppInitializer } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideServerRouting, RenderMode } from '@angular/ssr';
import { TEST_TOKEN } from '../token';

function provideAppDestruction(callback: () => void) {
  return provideAppInitializer(() => {
    inject(DestroyRef).onDestroy(() => callback());
  });
}

export const serverConfig = mergeApplicationConfig(appConfig, {
  providers: [
    provideServerRendering(),
    provideServerRouting([
      { path: 'WOLOLO', renderMode: RenderMode.Server }
    ]),
    // provideAppDestruction(() => {
    //   console.log('******** Destruction **********');
    // }),
    provideAppInitializer(() => {
      const testTOKEN = inject(TEST_TOKEN);
      console.log('TEST TOKEN', testTOKEN);
    })

    // provideAppInitializer(() => {
    //   // const req = inject(REQUEST);
    //   // const context = inject(REQUEST_CONTEXT);
    //   // console.log('WOLOLO', req, context);
    //   logInRouteExploration('Server App Initializer');
    // }),
    // provideEnvironmentInitializer(() => {
    //   logInRouteExploration('Server Environment Initializer');
    // }),
  ]
});
