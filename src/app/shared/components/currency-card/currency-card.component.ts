import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CurrencyService } from '@app/core/services/currency.service';
import { Observable, Subscription, interval, of, timer } from 'rxjs';
import {
  catchError,
  finalize,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';

export type CurrencyExchange = {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
};

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss'],
})
export class CurrencyCardComponent implements OnInit, OnDestroy {
  private timerSubscription!: Subscription;

  loading: boolean = true;
  @Input() currencyTitle!: string;
  @Input() currencyCode!: string;
  currency!: CurrencyExchange;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.fetchCurrencyExchange();
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  fetchCurrencyExchange() {
    // check every 60 seconds for new data (it will only fetch if data is not cached or older than 3 minutes)
    this.timerSubscription = interval(6000)
      .pipe(
        startWith(0),
        switchMap(() => {
          // Check if data is cached before setting loading to true
          this.loading =
            this.currencyService.getFromCache(this.currencyCode) === null;
          return this.currencyService.fetchData(this.currencyCode);
        })
      )
      .subscribe({
        next: (data) => {
          this.currency = data.hasOwnProperty(`${this.currencyCode}BRL`)
            ? data[`${this.currencyCode}BRL`]
            : data;
          console.log(this.currency);
		  console.log(this.loading)
          this.loading = false;
        },
        error: (error) => {
          console.error(error);
          this.loading = false;
        },
      });
  }

  reloadCurrency() {
    this.loading = true;
    this.fetchCurrencyExchange();
  }

  log(data: any) {
    console.log(data);
  }
}
