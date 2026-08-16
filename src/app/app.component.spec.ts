import { TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { ANALYTICS_SDK } from './core/analytics/analytics.service';
import { ConsoleAnalyticsSdk } from './core/analytics/console-analytics.sdk';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule, MatToolbarModule],
      providers: [{ provide: ANALYTICS_SDK, useClass: ConsoleAnalyticsSdk }],
    }).compileComponents();
  });

  it('renders the retail banking shell with primary navigation', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const toolbar = fixture.nativeElement.querySelector('.app-toolbar');
    expect(toolbar.textContent).toContain('Retail Digital Banking');
    expect(fixture.nativeElement.querySelectorAll('a[mat-button]').length).toBe(2);
  });
});
