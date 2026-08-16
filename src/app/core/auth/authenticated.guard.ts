import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthenticatedGuard  {
  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.isAuthenticated) {
      return true;
    }
    this.router.navigate(['/signed-out'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
