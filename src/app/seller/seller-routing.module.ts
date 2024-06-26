import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { sellerAuthGuard } from '../guards/seller-auth.guard';
import {CouponComponent} from "./coupon/coupon.component";

const routes: Routes = [
  {path: 'products', canActivate: [sellerAuthGuard], children:[
    {path: '', component: ProductsComponent},
    {path: 'upload', component: ProductAddComponent},
    {path: 'update/:_id', component: ProductUpdateComponent},
      {path: 'coupon', component: CouponComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
