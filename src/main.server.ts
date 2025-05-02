import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { serverConfig } from './app/app.config.server';
import { provideServerRendering } from '@angular/platform-server';

export const bootstrap = () => bootstrapApplication(AppComponent, serverConfig);

const subConfig = () => bootstrapApplication(AppComponent, { providers: [provideServerRendering(),]})

export default subConfig;
