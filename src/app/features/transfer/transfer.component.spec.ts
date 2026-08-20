import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DsModule } from '@bofa/ds';

import { ANALYTICS_SDK } from '../../core/analytics/analytics.service';
import { ConsoleAnalyticsSdk } from '../../core/analytics/console-analytics.sdk';
import { TransferComponent } from './transfer.component';

describe('TransferComponent', () => {
  let fixture: ComponentFixture<TransferComponent>;
  let component: TransferComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransferComponent],
      imports: [DsModule, ReactiveFormsModule, NoopAnimationsModule],
      providers: [{ provide: ANALYTICS_SDK, useClass: ConsoleAnalyticsSdk }],
    }).compileComponents();

    fixture = TestBed.createComponent(TransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the amount control inside a Material form field', () => {
    const infix = fixture.nativeElement.querySelector('.mat-form-field-infix');

    expect(infix).not.toBeNull();
    expect(infix.querySelector('input')?.getAttribute('type')).toBe('number');
  });

  it('renders the hint text under the amount control', () => {
    const hint = fixture.nativeElement.querySelector('.mat-form-field-subscript-wrapper');

    expect(hint?.textContent).toContain('require MFA step-up');
  });

  it('rejects a submit with no amount', () => {
    component.submit();

    expect(component.form.invalid).toBeTrue();
    expect(component.confirmation).toBeNull();
  });

  it('completes a sub-threshold transfer without MFA step-up', () => {
    component.form.controls.amount.setValue(250);

    component.submit();

    expect(component.stepUpRequired).toBeFalse();
    expect(component.confirmation).toBe('Transfer of $250.00 submitted.');
  });

  it('requires MFA step-up at or above $1,000 before confirming', fakeAsync(() => {
    component.form.controls.amount.setValue(1000);

    component.submit();
    expect(component.stepUpRequired).toBeTrue();
    expect(component.confirmation).toBeNull();

    tick(300);

    expect(component.confirmation).toBe('Transfer of $1000.00 submitted.');
    expect(component.stepUpRequired).toBeFalse();
  }));
});
