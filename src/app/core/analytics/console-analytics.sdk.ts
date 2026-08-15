import { AnalyticsPayload, AnalyticsSdk } from './analytics.service';

/**
 * Local stub used outside the corporate network, where the internal analytics SDK
 * is not resolvable from the public registry.
 */
export class ConsoleAnalyticsSdk implements AnalyticsSdk {
  private appId = 'unset';

  init(appId: string): void {
    this.appId = appId;
  }

  track(eventName: string, payload: AnalyticsPayload): void {
    // eslint-disable-next-line no-console
    console.debug(`[analytics:${this.appId}] ${eventName}`, payload);
  }
}
