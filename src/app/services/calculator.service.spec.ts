import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CalculatorService]
    });
    service = TestBed.inject(CalculatorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate price correctly', () => {
    const orders = {
      "Red set": 1,
      "Green set": 1,
      "Blue set": 1,
      "Yellow set": 1,
      "Pink set": 1,
      "Purple set": 1,
      "Orange set": 1
    };
    const memberCard = true;
    const mockResponse = { total_price: 419.4 };

    service.calculatePrice(orders, memberCard).subscribe(response => {
      expect(response.total_price).toEqual(mockResponse.total_price);
    });

    const req = httpMock.expectOne('http://127.0.0.1:5002/calculate');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
