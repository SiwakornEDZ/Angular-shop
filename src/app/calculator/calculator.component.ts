import { Component } from '@angular/core';
import {CalculatorService} from "../services/calculator.service";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})

export class CalculatorComponent {
  orders: { [key: string]: number } = {
    "Red set": 0,
    "Green set": 0,
    "Blue set": 0,
    "Yellow set": 0,
    "Pink set": 0,
    "Purple set": 0,
    "Orange set": 0,
    "Black set": 0
  };
  prices: any = {
    "Red set": 50,
    "Green set": 40,
    "Blue set": 30,
    "Yellow set": 50,
    "Pink set": 80,
    "Purple set": 90,
    "Orange set": 120,
    "Black set": 200
  }
  //black set :200
  //black set 3 set discont 20%

  memberCard = false;
  totalPrice: number | null = null;

  constructor(
    private calculatorService: CalculatorService
  ) {}

  calculate() {
    this.calculatorService.calculatePrice(this.orders, this.memberCard).subscribe(
      response => {
        this.totalPrice = response.total_price;
      },
      error => {
        console.error('Error calculating price :', error);
      }
    );
  }

  orderKeys() {
    return Object.keys(this.orders);
  }

}
