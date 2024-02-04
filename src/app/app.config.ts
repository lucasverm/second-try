import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimations(),
  { provide: MAT_DATE_LOCALE, useValue: 'nl-BE' }]
};
