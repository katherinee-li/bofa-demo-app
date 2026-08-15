import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';
import { AuthenticatedGuard } from './authenticated.guard';

describe('AuthenticatedGuard', () => {
  let guard: AuthenticatedGuard;
  let auth: AuthService;
  let router: Router;

  const state = { url: '/dashboard' } as RouterStateSnapshot;
  const route = {} as ActivatedRouteSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [RouterTestingModule] });
    guard = TestBed.inject(AuthenticatedGuard);
    auth = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('allows navigation for an active session', () => {
    expect(guard.canActivate(route, state)).toBeTrue();
  });

  it('redirects to signed-out with the return url when the session is gone', () => {
    const navigate = spyOn(router, 'navigate');
    auth.signOut();

    expect(guard.canActivate(route, state)).toBeFalse();
    expect(navigate).toHaveBeenCalledWith(['/signed-out'], {
      queryParams: { returnUrl: '/dashboard' },
    });
  });
});
