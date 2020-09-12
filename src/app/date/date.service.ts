
import {interval as observableInterval,  Observable } from 'rxjs';

import {share, map, startWith} from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class DateService {
  private date: Observable<Date>;
  private locale = 'en-us';

  constructor() {
    this.date = observableInterval(10000).pipe(startWith(0),map(() => new Date()),share(),);
  }

  getDate(): Observable<Date> {
    return this.date;
  }

  formatDate(date: Date): string {
    const month = date.toLocaleString(this.locale, { month: 'short' });
    const weekday = date.toLocaleString(this.locale, { weekday: 'short' });
    const day = date.toLocaleString(this.locale, { day: 'numeric' });

    return `${weekday} ${month}.${day}`;
  }
}
