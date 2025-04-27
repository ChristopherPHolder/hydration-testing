import { mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { RenderMode, provideServerRouting } from '@angular/ssr';

export const serverConfig = mergeApplicationConfig(appConfig, {
  providers: [
    provideServerRendering(),
    provideServerRouting([{ path: '**', renderMode: RenderMode.Server }])
  ]
});
