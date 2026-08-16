import { Inject, Injectable, InjectionToken } from '@angular/core';

export interface AnalyticsPayload {
  [key: string]: string | number | boolean | null;
}

/**
 * Stand-in for the internal analytics SDK. The real SDK is distributed through the
 * internal registry and is only configurable through this token.
 */
export interface AnalyticsSdk {
  init(appId: string): void;
  track(eventName: string, payload: AnalyticsPayload): void;
}

export const ANALYTICS_SDK = new InjectionToken<AnalyticsSdk>('ANALYTICS_SDK');

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private initialized = false;

  constructor(@Inject(ANALYTICS_SDK) private readonly sdk: AnalyticsSdk) {}

  init(appId: string): void {
    if (this.initialized) {
      return;
    }
    this.sdk.init(appId);
    this.initialized = true;
  }

  pageView(route: string): void {
    this.sdk.track('page_view', { route });
  }

  action(name: string, payload: AnalyticsPayload = {}): void {
    this.sdk.track(name, payload);
  }
}
