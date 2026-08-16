import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, map, of, tap } from 'rxjs';

export interface AuthenticatedUser {
  displayName: string;
  customerId: string;
  mfaSatisfied: boolean;
}

/**
 * Stand-in for the internal SSO/MFA client. Shape mirrors the real client: a session
 * observable plus an MFA step-up call that resolves out of band.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly session$ = new BehaviorSubject<AuthenticatedUser | null>({
    displayName: 'Jordan Reyes',
    customerId: 'CUST-88213',
    mfaSatisfied: true,
  });

  get session(): Observable<AuthenticatedUser | null> {
    return this.session$.asObservable();
  }

  get isAuthenticated(): boolean {
    return this.session$.value !== null;
  }

  requiresStepUp(amount: number): boolean {
    return amount >= 1000;
  }

  stepUp(): Observable<boolean> {
    return of(true).pipe(
      delay(250),
      tap(() => {
        const current = this.session$.value;
        if (current) {
          this.session$.next({ ...current, mfaSatisfied: true });
        }
      }),
      map(() => true)
    );
  }

  signOut(): void {
    this.session$.next(null);
  }
}
