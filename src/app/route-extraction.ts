import { inject, PLATFORM_ID, REQUEST } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

export const isRouteExploration = () => inject(REQUEST) === null;

export const logInRouteExploration = (message: string) => {
  if (isRouteExploration()) {
    const p = inject(PLATFORM_ID);
    console.log('[Route Exploration]:', message);
  }
  else {
    console.log('[SSR Render]', message);
  }
}
