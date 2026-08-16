import { Component, OnInit } from '@angular/core';

import { AnalyticsService } from './core/analytics/analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly analytics: AnalyticsService) {}

  ngOnInit(): void {
    this.analytics.init('retail-digital-banking');
  }
}
