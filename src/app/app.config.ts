import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { customInterceptor } from './interceptores/custom.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideToastr(), provideAnimations(), importProvidersFrom(HttpClientModule), provideClientHydration(), provideHttpClient(withInterceptors([customInterceptor]))]
};
