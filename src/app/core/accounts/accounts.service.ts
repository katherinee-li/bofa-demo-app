import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

import { DsTransaction } from '@bofa/ds';

export interface Account {
  accountName: string;
  accountNumber: string;
  balance: number;
  availableBalance: number;
}

const ACCOUNTS: Account[] = [
  {
    accountName: 'Advantage Plus Checking',
    accountNumber: '4021998812',
    balance: 8412.55,
    availableBalance: 8112.55,
  },
  {
    accountName: 'Advantage Savings',
    accountNumber: '4021771290',
    balance: 26310.04,
    availableBalance: 26310.04,
  },
];

const TRANSACTIONS: DsTransaction[] = [
  { postedAt: '2026-08-12', description: 'PAYROLL DIRECT DEP', category: 'Income', amount: 3212.88 },
  { postedAt: '2026-08-11', description: 'CITY UTILITIES', category: 'Bills', amount: -184.22 },
  { postedAt: '2026-08-11', description: 'CORNER MARKET', category: 'Groceries', amount: -76.4 },
  { postedAt: '2026-08-10', description: 'TRANSFER TO SAVINGS', category: 'Transfer', amount: -500 },
  { postedAt: '2026-08-09', description: 'COFFEE ROASTERS #22', category: 'Dining', amount: -6.75 },
  { postedAt: '2026-08-08', description: 'CARD REFUND', category: 'Refund', amount: 42.19 },
];

@Injectable({ providedIn: 'root' })
export class AccountsService {
  listAccounts(): Observable<Account[]> {
    return of(ACCOUNTS).pipe(delay(120));
  }

  listTransactions(accountNumber: string): Observable<DsTransaction[]> {
    const scoped = accountNumber ? TRANSACTIONS : [];
    return of(scoped).pipe(delay(120));
  }
}
