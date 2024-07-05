import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Coupon } from '../models/dataTypes';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  public replaceUrl = 'http://localhost:5002/'
  public url = 'http://localhost:5002/'

  constructor(private http: HttpClient) { }

  getHeaders(){
    let userStore = localStorage.getItem('admin')
    let accessToken = userStore && JSON.parse(userStore).accessToken

    let httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return httpHeaders

  }

  errorHandler(error: HttpErrorResponse){
    console.log(error);
    return throwError(error)
  }

  createCoupons(couponData: Coupon){
    let Headers = this.getHeaders()
    return this.http.post<Coupon>(`${this.url}coupons`, couponData, { headers: Headers })
      .pipe(catchError(this.errorHandler))
  }

  getCoupons(){
    // let Headers = this.getHeaders()
    return this.http.get<Coupon[]>(`${this.url}coupons`)
      .pipe(catchError(this.errorHandler))
  }

  getCoupon(couponId: string){
    let Headers = this.getHeaders()
    return this.http.get<Coupon>(`${this.url}coupons/${couponId}`, { headers: Headers })
      .pipe(catchError(this.errorHandler))
  }

  updateCoupons(couponData: Coupon){
    let Headers = this.getHeaders()
    return this.http.put<Coupon>(`${this.url}coupons/${couponData._id}`, couponData, { headers: Headers })
      .pipe(catchError(this.errorHandler))
  }

  deleteCoupons(couponId: string){
    let Headers = this.getHeaders()
    return this.http.delete<Coupon>(`${this.url}coupons/${couponId}`, { headers: Headers })
      .pipe(catchError(this.errorHandler))
  }
}
