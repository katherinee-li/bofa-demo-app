import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DsStatementPeriod, DsTransaction } from '@bofa/ds';

import { Account, AccountsService } from '../../core/accounts/accounts.service';
import { AnalyticsService } from '../../core/analytics/analytics.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  accounts$!: Observable<Account[]>;
  transactions: DsTransaction[] = [];
  selectedAccount = '4021998812';
  showFraudAlert = true;

  readonly statementPeriods: DsStatementPeriod[] = [
    { label: 'August 2026', periodId: '2026-08', documentCount: 1 },
    { label: 'July 2026', periodId: '2026-07', documentCount: 2 },
    { label: 'June 2026', periodId: '2026-06', documentCount: 2 },
  ];

  constructor(
    private readonly accountsService: AccountsService,
    private readonly analytics: AnalyticsService,
    readonly auth: AuthService
  ) {}

  ngOnInit(): void {
    this.analytics.pageView('/dashboard');
    this.accounts$ = this.accountsService.listAccounts();
    this.loadTransactions(this.selectedAccount);
  }

  loadTransactions(accountNumber: string): void {
    this.selectedAccount = accountNumber;
    this.accountsService.listTransactions(accountNumber).subscribe((transactions) => {
      this.transactions = transactions;
    });
  }

  onStatementPeriodChanged(periodId: string | undefined): void {
    this.analytics.action('statement_period_changed', { periodId: periodId ?? null });
  }

  dismissFraudAlert(): void {
    this.showFraudAlert = false;
    this.analytics.action('fraud_alert_dismissed', {});
  }
}
