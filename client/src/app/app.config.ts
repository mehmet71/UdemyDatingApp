import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AccountService } from './services/accountService';
import { UserDataService } from './services/userDataService';
import { provideStore } from '@ngrx/store';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    UserDataService,
    AccountService,
    provideHttpClient(),
    provideStore(),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-center'
    })]
};
