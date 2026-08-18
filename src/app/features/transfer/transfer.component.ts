import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AnalyticsService } from '../../core/analytics/analytics.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
    selector: 'app-transfer',
    templateUrl: './transfer.component.html',
    styleUrls: ['./transfer.component.scss'],
    standalone: false
})
export class TransferComponent {
  readonly form = this.fb.nonNullable.group({
    fromAccount: ['4021998812', Validators.required],
    toAccount: ['4021771290', Validators.required],
    amount: [null as number | null, [Validators.required, Validators.min(0.01)]],
  });

  submitting = false;
  stepUpRequired = false;
  confirmation: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly analytics: AnalyticsService
  ) {}

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const amount = this.form.controls.amount.value ?? 0;
    this.submitting = true;
    this.stepUpRequired = this.auth.requiresStepUp(amount);

    if (this.stepUpRequired) {
      this.auth.stepUp().subscribe(() => this.complete(amount));
      return;
    }

    this.complete(amount);
  }

  private complete(amount: number): void {
    this.submitting = false;
    this.stepUpRequired = false;
    this.confirmation = `Transfer of $${amount.toFixed(2)} submitted.`;
    this.analytics.action('transfer_submitted', { amount });
  }
}
