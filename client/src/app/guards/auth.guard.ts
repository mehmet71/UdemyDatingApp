import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/accountService';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = () => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  if (accountService.currentUser()) {
    return true;
  }
  else {
    return router.createUrlTree(['/members']);
  }
};
