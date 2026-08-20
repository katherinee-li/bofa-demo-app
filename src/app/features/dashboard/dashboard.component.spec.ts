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

  it('renders each account name as a card title', fakeAsync(() => {
    fixture.detectChanges();
    tick(200);
    fixture.detectChanges();

    const titles = Array.from(
      fixture.nativeElement.querySelectorAll('.mat-card-title') as NodeListOf<HTMLElement>
    ).map((title) => title.textContent?.trim());

    expect(titles).toEqual(['Advantage Plus Checking', 'Advantage Savings']);
  }));

  it('renders a tab label per statement period', fakeAsync(() => {
    fixture.detectChanges();
    tick(200);
    fixture.detectChanges();

    const labels = fixture.nativeElement.querySelectorAll('.mat-tab-label');

    expect(labels.length).toBe(component.statementPeriods.length);
    expect(labels[0].textContent).toContain('August 2026');
  }));

  it('renders the account activity control as a raised button', fakeAsync(() => {
    fixture.detectChanges();
    tick(200);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('bofa-button .mat-raised-button');

    expect(button).not.toBeNull();
    expect(button.querySelector('.mat-button-wrapper')?.textContent).toContain('View activity');
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
