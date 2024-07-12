import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { CouponService } from '../../services/coupon.service';
import { Router } from '@angular/router';
import { Coupon } from '../../models/dataTypes';
import {isValidDate} from "rxjs/internal/util/isDate";
import {map, startWith} from "rxjs";

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrl: './coupon.component.css'
})
export class CouponComponent {
  public couponMsg: string | undefined
  public percentagePattern = /^[0-9]*$/;

  constructor(private fb: FormBuilder, private couponService: CouponService, private router: Router){
    this.couponForm.get('percentage')?.valueChanges.pipe(
      startWith(''),
      map(value => value ? this.percentagePattern.test(value) : false)
    ).subscribe(isValid => {
      if (!isValid) {
        this.couponForm.get('percentage')?.setErrors({ 'pattern': true });
      }
    });
  }

  couponForm = this.fb.group({
    couponName: ['', Validators.required],
    couponType: ['' , [Validators.required]],
    discountType: ['' , [Validators.required]],
    percentage: ['', [Validators.pattern(this.percentagePattern), Validators.min(0), Validators.max(100)]],
    amount: ['', [Validators.pattern(this.percentagePattern)]],
    discountTypeOnTop: ['',Validators.required],
    category: ['',Validators.required],
    percentageOnTop: ['' ,[Validators.pattern(this.percentagePattern)]],
    pointOnTop: ['' ,[Validators.pattern(this.percentagePattern)]],
    everyThb: ['' ,[Validators.pattern(this.percentagePattern)]],
    discountThb: ['' ,[Validators.pattern(this.percentagePattern)]],

  })

  onSubmit(){
    let couponData = this.couponForm!.value as Coupon
    this.couponService.createCoupons(couponData).subscribe((res)=>{
      console.log('rf', res);
      if(res && res._id){
        this.couponMsg = 'Coupon is successfully added'
      }
      this.getTimeout()
    }, (err)=>{
      if(err){
        console.log(err.message);
        this.couponMsg = 'Please Add Unique Name Or Add A Valid value'
      }
      this.getTimeout()
    })
  }

  getTimeout(){
    setTimeout(() => {
      this.couponMsg = undefined
      this.couponForm
    }, 4000);
  }

}
