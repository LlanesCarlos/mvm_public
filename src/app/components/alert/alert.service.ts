import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface Alert {
  type: string;
  text: string;
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new Subject<Alert>();
  public alerts$: Observable<Alert> = this.subject.asObservable();

  success(message: string) {
    this.subject.next({ type: 'success', text: message });
  }

  error(message: string) {
    this.subject.next({ type: 'error', text: message });
  }

  clear() {
    this.subject.next(null);
  }
}
