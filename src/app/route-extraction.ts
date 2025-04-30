import { inject, REQUEST } from '@angular/core';
import { TEST_TOKEN } from '../token';

export const isRouteExploration = () => inject(REQUEST) === null;

export const logInRouteExploration = (message: string) => {
  return;
  const testTOKEN = inject(TEST_TOKEN);
  if (isRouteExploration()) {
    console.log('[Route Exploration]:', message, testTOKEN);
  }
  else {
    console.log('[SSR Render]', message, testTOKEN);
  }
}
