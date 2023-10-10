import {
  ComponentFixture,
  TestBed,
  discardPeriodicTasks,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { CurrencyCardComponent } from '@shared/components/currency-card/currency-card.component';
import { CurrencyService } from '@core/services/currency.service';
import { of, throwError } from 'rxjs';
import { TimeFormatPipe } from '@app/core/pipes/time-format.pipe';

describe('CurrencyCardComponent', () => {
  let component: CurrencyCardComponent;
  let fixture: ComponentFixture<CurrencyCardComponent>;
  let mockCurrencyService: any;
  let compiled: any;
  const mockData = {
    code: 'CAD',
    codein: 'BRL',
    name: 'Dólar Canadense/Real Brasileiro',
    high: '5.734',
    low: '5.7279',
    varBid: '-0.0054',
    pctChange: '-0.09',
    bid: '5.7276',
    ask: '5.7282',
    timestamp: '1618315045',
    create_date: '2021-04-13 08:57:27',
  };

  beforeEach(() => {
    // Mock the currency service
    mockCurrencyService = jasmine.createSpyObj('CurrencyService', [
      'fetchData',
      'getFromCache',
    ]);
    TestBed.configureTestingModule({
      declarations: [CurrencyCardComponent, TimeFormatPipe],
      providers: [{ provide: CurrencyService, useValue: mockCurrencyService }],
    });

    fixture = TestBed.createComponent(CurrencyCardComponent);
    component = fixture.componentInstance;
    component.currencyCode = 'CAD';
    compiled = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch currency exchange data on init', fakeAsync(() => {
    mockCurrencyService.fetchData.and.returnValue(of(mockData));
    mockCurrencyService.getFromCache.and.returnValue(null);

    component.ngOnInit();

    expect(mockCurrencyService.fetchData).toHaveBeenCalledWith('CAD');
    // Use tick to trigger the timers in fakeAsync
    tick(180000);
    expect(component.currency).toEqual(mockData);
    discardPeriodicTasks()
  }));

  it('should handle service error', () => {
    mockCurrencyService.fetchData.and.returnValue(
      throwError(() => 'An error occurred')
    );
    fixture.detectChanges();
    expect(component.currency).toBeUndefined();
  });
});
