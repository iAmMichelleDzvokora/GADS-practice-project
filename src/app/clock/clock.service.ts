
import {interval as observableInterval,  Observable } from 'rxjs';

import {share, map, startWith} from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class ClockService {
  private clock: Observable<Date>;

  constructor() {
    this.clock = observableInterval(1000).pipe(startWith(0),map(tick => new Date()),share(),);
  }

  getClock(): Observable<Date> {
    return this.clock;
  }
}
