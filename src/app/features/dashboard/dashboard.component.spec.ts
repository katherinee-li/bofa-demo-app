import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { DsModule } from '@bofa/ds';

import { ANALYTICS_SDK } from '../../core/analytics/analytics.service';
import { ConsoleAnalyticsSdk } from '../../core/analytics/console-analytics.sdk';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [DsModule, ReactiveFormsModule, NoopAnimationsModule, RouterTestingModule],
      providers: [{ provide: ANALYTICS_SDK, useClass: ConsoleAnalyticsSdk }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('loads transactions for the default account on init', fakeAsync(() => {
    fixture.detectChanges();
    tick(200);

    expect(component.transactions.length).toBeGreaterThan(0);
  }));

  it('renders one account card per account', fakeAsync(() => {
    fixture.detectChanges();
    tick(200);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('bofa-account-card').length).toBe(2);
  }));

  it('hides the fraud alert once dismissed', fakeAsync(() => {
    fixture.detectChanges();
    tick(200);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('bofa-alert-banner')).not.toBeNull();

    component.dismissFraudAlert();
    fixture.detectChanges();

    expect(component.showFraudAlert).toBeFalse();
    expect(fixture.nativeElement.querySelector('bofa-alert-banner')).toBeNull();
  }));
});
