import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Dummy auth flag (can be changed to false to test protection)
  const isAuthenticated = true; 

  if (isAuthenticated) {
    return true;
  } else {
    console.warn('Auth Guard: Access denied. Redirecting to home.');
    return router.parseUrl('/');
  }
};
