import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CalculatorComponent } from './calculator/calculator.component';
import { CalculatorService } from './services/calculator.service';
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: '', component: CalculatorComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes) // Import RouterModule with routes
  ],
  providers: [CalculatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
