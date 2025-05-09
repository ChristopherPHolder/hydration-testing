import { inject, mergeApplicationConfig, provideEnvironmentInitializer, REQUEST_CONTEXT, } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideServerRouting, RenderMode } from '@angular/ssr';
import { ROUTES } from '@angular/router';
import { REQUEST_EXPLORATION } from './request-exploration';
import { routes } from './routes';

const preClientConfig = {
  providers: [
    provideEnvironmentInitializer(() => {
      const requestContext = inject(REQUEST_CONTEXT);
      // console.log('preClientConfig', requestContext);
    }),
  ]
};

const postClientConfig = {
  providers: [
    provideEnvironmentInitializer(() => {
      const requestContext = inject(REQUEST_CONTEXT);
      console.log('postClientConfig', requestContext);
    }),
    { provide: ROUTES, useFactory: () => inject(REQUEST_EXPLORATION) ? [] : routes, multi: true },
    provideServerRendering(),
    provideServerRouting([{ path: '**', renderMode: RenderMode.Server }]),
  ]
}

let isRouteExplorationPhase = true
function provideContextAware() {
  if (isRouteExplorationPhase) {
    isRouteExplorationPhase = false;
    return [];
  }
  return [provideEnvironmentInitializer(() => {
    const requestContext = inject(REQUEST_CONTEXT);
    console.log('postClientConfig', requestContext);
  })]
}

export const serverConfig = mergeApplicationConfig(preClientConfig, appConfig, postClientConfig);
