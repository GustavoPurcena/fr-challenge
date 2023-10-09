import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { CurrencyExchange } from '@app/shared/components/currency-card/currency-card.component';

const currencyAPI: string = 'https://economia.awesomeapi.com.br/last/';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private cacheTime: number = 180000; // 3 minutes in milliseconds

  constructor(private http: HttpClient) {}

  fetchData(currencyCode: string): Observable<any> {
    // Check if cache is available and not expired
    const cachedData = this.getFromCache(currencyCode);

    if (cachedData) {
      return of(cachedData);
    }

    return this.http
      .get(`${currencyAPI}${currencyCode}-BRL`)
      .pipe(tap((data) => this.saveToCache(currencyCode, data)));
  }

  getFromCache(currencyCode: string): CurrencyExchange | null {
    const cached = JSON.parse(localStorage.getItem(currencyCode) || 'null');
    // Check if cache is available and not expired, if not, return null
    if (
      !cached ||
      Date.now() - Date.parse(cached.create_date) >= this.cacheTime
    ) {
      return null;
    }

    return cached;
  }

  private saveToCache(currencyCode: string, data: any): void {
    const cacheData = data[`${currencyCode}BRL`];
    localStorage.setItem(currencyCode, JSON.stringify(cacheData));
  }
}
