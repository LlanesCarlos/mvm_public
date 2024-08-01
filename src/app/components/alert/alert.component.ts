import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService, Alert } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  alerts: Alert[] = [];
  subscription: Subscription;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.subscription = this.alertService.alerts$.subscribe(alert => {
      if (!alert) {
        this.alerts = [];
        return;
      }

      this.alerts.push(alert);
      setTimeout(() => this.removeAlert(alert), 5000);
    });
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
