import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private apiUrl = 'http://127.0.0.1:5002/calculate';

  constructor(private http: HttpClient) {}

  calculatePrice(orders: any, memberCard: boolean): Observable<any> {
    return this.http.post<any>(this.apiUrl, { orders, member_card: memberCard });
  }
}
