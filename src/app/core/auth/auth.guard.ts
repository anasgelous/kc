import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  let authService = inject(AuthService);
  let oAuthService = authService.oAuthService

  if(oAuthService.hasValidAccessToken()) {
    return true;
  }

  inject(Router).navigate(['/login']);
  return false;
};
