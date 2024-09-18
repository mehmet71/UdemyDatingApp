import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AccountService } from './services/accountService';
import { UserDataService } from './services/userDataService';
import { provideStore } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), UserDataService, AccountService, provideHttpClient(), provideAnimationsAsync(), provideStore()]
};
