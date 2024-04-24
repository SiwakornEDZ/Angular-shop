import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Cart, Coupon, PriceSummary} from '../../models/dataTypes';
import { Router } from '@angular/router';
import { ShopService } from '../../services/shop.service';
import { CouponService } from '../../services/coupon.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit , OnChanges{

  public cart: Cart[] | undefined
  public allcoupon :Coupon[] | undefined
  selectedCoupons: Coupon[] | undefined
  selectedCoupon: string | undefined
  enteredCouponName: any
  percentage: boolean = false
  itemWithCategory: any [''] | undefined

  public priceSummary: PriceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }

  constructor(
    private router: Router,
    private CouponService: CouponService,
    private shopService: ShopService){
    // this.selectedCoupon = 'coupon';
  }

  ngOnInit(): void {
    this.getAllCoupon()
    this.loadCardDetails()
    this.searchCouponName()
    // if (!this.selectedCoupon) {
    //   this.selectedCoupon = 'coupon';
    // }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedCoupons'] && !changes['selectedCoupons'].firstChange) {
      console.log(this.selectedCoupon);
      this.loadCardDetails();
    }
  }

  searchCouponName() {
    if (!this.selectedCoupon) {
      console.error('No coupon selected');
      return;
    }
    this.enteredCouponName = this.selectedCoupon;
    // this.selectedCoupons = this.allcoupon?.filter(coupon => coupon.couponName.includes(this.enteredCouponName));
    this.selectedCoupons = this.allcoupon?.filter(coupon => coupon.couponName === this.enteredCouponName);
    console.log(`Searching for coupon: ${this.enteredCouponName}`);
    console.log(this.selectedCoupons);
  }

  confirmCoupon() {
    if (!this.selectedCoupon) {
      console.error('No coupon selected');
      return;
    }
    console.log(`Coupon confirmed: ${this.selectedCoupon}`);
    console.log(this.itemWithCategory);
    this.enteredCouponName = this.selectedCoupon;
    // this.selectedCoupons = this.allcoupon?.filter(coupon => coupon.couponName.includes(this.enteredCouponName));
    console.log(`Searching for coupon: ${this.enteredCouponName}`);
    console.log(this.itemWithCategory);
    this.selectedCoupons = this.allcoupon?.filter(coupon => coupon.couponName === this.enteredCouponName);
    console.log(`Searching for coupon: ${this.enteredCouponName}`);
    if (this.selectedCoupons && this.selectedCoupons.length > 0) {
      console.log('Found matching coupons');
      console.log(this.selectedCoupons);
      // console.log(this.selectedCoupons[0].category);
      if(this.selectedCoupons[0].discountType === 'percentage'){
        this.percentage = this.selectedCoupons[0].discountType === 'percentage'
        console.log(this.percentage)
        // @ts-ignore
        this.priceSummary.discount = this.selectedCoupons[0].percentage + '%';
        // @ts-ignore
        this.priceSummary.total = this.priceSummary.price - (this.priceSummary.price * this.selectedCoupons[0].percentage/100);
        console.log(this.priceSummary.price);
        console.log(this.selectedCoupons[0].amount);
      }
      if(this.selectedCoupons[0].discountType === 'amount'){
        this.percentage = false;
        // @ts-ignore
        this.priceSummary.discount = this.selectedCoupons[0].amount;
        // @ts-ignore
        this.priceSummary.total = this.priceSummary.price - this.selectedCoupons[0].amount;
        if(this.priceSummary.total < 0){
          this.priceSummary.total = 0;
        }
        console.log(this.priceSummary.price);
        console.log(this.selectedCoupons[0].amount);
      }
      if(this.selectedCoupons[0].discountTypeOnTop === 'percentageontop' && this.selectedCoupons[0].category.includes('Electronic')){
        console.log('Discount on top of the discount');
        this.percentage = this.selectedCoupons[0].discountTypeOnTop === 'percentageontop'
        this.shopService.getCart().subscribe((res)=> {
          this.cart = res.cart.products
          // console.log(this.cart);
          let price = 0
          res.cart.products.forEach((item: any) => {
            if (item.quantity && item.price && item.categories === 'Electronic') {
              // @ts-ignore
              price += (+item.price * +item.quantity) - (+item.price * +item.quantity * this.selectedCoupons[0].percentageOnTop / 100);
            }
            this.priceSummary.price = price
            this.priceSummary.total = this.priceSummary.total - price
          })
        })

        console.log(this.percentage)
        // @ts-ignore
        this.priceSummary.discount = this.selectedCoupons[0].percentageOnTop + '%';
        // @ts-ignore
        // this.priceSummary.total = this.priceSummary.price - (this.priceSummary.price * this.selectedCoupons[0].percentageOnTop/100);
        console.log(this.priceSummary.price);
        console.log(this.selectedCoupons[0].amount);
      }
      if(this.selectedCoupons[0].discountTypeOnTop === 'percentageontop' && this.selectedCoupons[0].category.includes('Accessories')){
        console.log('Discount on top of the Accessories discount');
        this.loadCardDetails()
        this.percentage = this.selectedCoupons[0].discountTypeOnTop === 'percentageontop'
        this.shopService.getCart().subscribe((res)=> {
          this.cart = res.cart.products
          // console.log(this.cart);
          let price = 0
          res.cart.products.forEach((item: any) => {
            if (item.quantity && item.price && item.categories === 'Accessories') {
              // @ts-ignore
              price += (+item.price * +item.quantity) - (+item.price * +item.quantity * this.selectedCoupons[0].percentageOnTop / 100);
            }
            this.priceSummary.price = price
            this.priceSummary.total = this.priceSummary.total - price
          })
        })
        console.log(this.percentage)
        // @ts-ignore
        this.priceSummary.discount = this.selectedCoupons[0].percentageOnTop + '%';
        // @ts-ignore
        // this.priceSummary.total = this.priceSummary.price - (this.priceSummary.price * this.selectedCoupons[0].percentageOnTop/100);
        console.log(this.priceSummary.price);
        console.log(this.selectedCoupons[0].amount);
      }
      if(this.selectedCoupons[0].discountTypeOnTop === 'percentageontop' && this.selectedCoupons[0].category.includes('Clothing')){
        console.log('Discount on top of the Clothing discount');
        this.loadCardDetails()
        this.percentage = this.selectedCoupons[0].discountTypeOnTop === 'percentageontop'
        this.shopService.getCart().subscribe((res)=> {
          this.cart = res.cart.products
          // console.log(this.cart);
          let price = 0
          res.cart.products.forEach((item: any) => {
            if (item.quantity && item.price && item.categories === 'Clothing') {
              // @ts-ignore
              price += (+item.price * +item.quantity) - (+item.price * +item.quantity * this.selectedCoupons[0].percentageOnTop / 100);
            }
            this.priceSummary.price = price
            this.priceSummary.total = this.priceSummary.total - price
          })
        })
        // console.log(this.percentage)
        // @ts-ignore
        this.priceSummary.discount = this.selectedCoupons[0].percentageOnTop + '%';
        // @ts-ignore
        // this.priceSummary.total = this.priceSummary.price - (this.priceSummary.price * this.selectedCoupons[0].percentageOnTop/100);
        // console.log(this.priceSummary.price);
        // console.log(this.selectedCoupons[0].amount);
      }
      if(this.selectedCoupons[0].discountTypeOnTop === 'amountontop'){
        this.percentage = false;
        // @ts-ignore
        let maxDiscount = this.priceSummary.price * 0.20; // Calculate 20% of the price
        // @ts-ignore
        let discount = Math.min(this.selectedCoupons[0].pointOnTop, maxDiscount); // Ensure the discount does not exceed 20% of the price
        this.priceSummary.discount = discount;
        this.priceSummary.total = this.priceSummary.price - discount;
        if(this.priceSummary.total < 0){
          this.priceSummary.total = 0;
        }
        console.log(this.priceSummary.price);
        console.log(this.selectedCoupons[0].amount);
      }
      if(this.selectedCoupons[0].couponType === 'seasonal'){
        this.percentage = false;
        // @ts-ignore
        let discountTimes = Math.floor(this.priceSummary.price / this.selectedCoupons[0].everyThb);
        // @ts-ignore
        let totalDiscount = discountTimes * this.selectedCoupons[0].discountThb;
        // @ts-ignore
        let discount = totalDiscount
        this.priceSummary.discount = discount;
        this.priceSummary.total = this.priceSummary.price - discount;
        if(this.priceSummary.total < 0){
          this.priceSummary.total = 0;
        }
        console.log(this.priceSummary.price);
        console.log(this.selectedCoupons[0].amount);
      }
    } else {
      console.log('No matching coupons found');
    }
  }


  calculateDiscountedPrice(item: any) {
    let itemTotal = +item.price * +item.quantity;
    // @ts-ignore
    if (item.categories === 'Electronics' && this.selectedCoupons[0].discountTypeOnTop === 'percentageontop') {
      // @ts-ignore
      let discount = itemTotal * this.selectedCoupons[0].percentageOnTop / 100;
      itemTotal -= discount;
    }
    return itemTotal;
  }

  getAllCoupon(){
    this.CouponService.getCoupons().subscribe((res)=>{
      if(res){
        this.allcoupon = res
        // console.log(this.allcoupon)
      }
    })
  }

  loadCardDetails(){
    this.shopService.getCart().subscribe((res)=>{
      this.cart = res.cart.products
      // console.log(this.cart);
      let price = 0
      res.cart.products.forEach((item: any)=>{
        if(item.quantity && item.price){
          price+= +item.price * +item.quantity
          if (!this.itemWithCategory) {
            this.itemWithCategory = new Set();
          }
          this.itemWithCategory.add(item.categories);
        }
      })
      this.itemWithCategory = Array.from(this.itemWithCategory);
      console.log(this.itemWithCategory);
      let desiredCouponType = this.selectedCoupon;
      this.selectedCoupons = this.allcoupon?.filter(coupon => coupon.couponType === desiredCouponType);
      // console.log(this.allcoupon?.find(coupon => coupon.code === this.selectedCoupon)?.discount)
      // if(this.selectedCoupon === 'coupon'){
      //   this.priceSummary.discount = selectedCoupon.discount
      //   price -= selectedCoupon.discount
      // }
      this.priceSummary.price = price
      this.priceSummary.discount = 0
      // this.priceSummary.tax = price/10
      // this.priceSummary.delivery = 100
      this.priceSummary.total = price
      // console.log(this.priceSummary.total);
      if(!this.cart?.length){
        this.router.navigate(['/'])
      }else{
        this.shopService.getCartCount()
      }
    })
  }

  removeFromCart(productId: string){
    this.shopService.removeItemFromCart(productId).subscribe((res)=>{
      this.loadCardDetails()
    })

  }

  // checkoutOrder(){
  //   this.router.navigate(['/checkout'])
  // }

}
