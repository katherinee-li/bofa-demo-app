import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DsModule } from '@bofa/ds';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ANALYTICS_SDK } from './core/analytics/analytics.service';
import { ConsoleAnalyticsSdk } from './core/analytics/console-analytics.sdk';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TransferComponent } from './features/transfer/transfer.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent, TransferComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    DsModule,
  ],
  providers: [{ provide: ANALYTICS_SDK, useClass: ConsoleAnalyticsSdk }],
  bootstrap: [AppComponent],
})
export class AppModule {}
