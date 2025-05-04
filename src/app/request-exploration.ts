import { inject, InjectionToken, PLATFORM_ID, REQUEST_CONTEXT } from '@angular/core';
import { isPlatformServer } from '@angular/common';

export const REQUEST_EXPLORATION = new InjectionToken<boolean>('REQUEST_EXPLORATION', {
  providedIn: 'root',
  factory: () => isPlatformServer(inject(PLATFORM_ID)) && inject(REQUEST_CONTEXT) === null
});
