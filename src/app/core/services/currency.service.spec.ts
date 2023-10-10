
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CurrencyService } from '@core/services/currency.service';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyService]
    });
    service = TestBed.inject(CurrencyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data for CAD exchange', () => {
    const mockData = {
      "code": "CAD",
      "codein": "BRL",
      "name": "Dólar Canadense/Real Brasileiro",
      "high": "5.734",
      "low": "5.7279",
      "varBid": "-0.0054",
      "pctChange": "-0.09",
      "bid": "5.7276",
      "ask": "5.7282",
      "timestamp": "1618315045",
      "create_date": "2021-04-13 08:57:27"
  };
    const apiURL = 'https://economia.awesomeapi.com.br/last/CAD-BRL';

    // Make an API call
    service.fetchData("CAD").subscribe(data => {
      expect(data).toEqual(mockData);
    });
    // Expect that a single request has been made which matches the given URL
    const req = httpTestingController.expectOne(apiURL);
    // Assert that the request is a GET
    expect(req.request.method).toEqual('GET');
    // Respond with mock data
    req.flush(mockData);
  });
});