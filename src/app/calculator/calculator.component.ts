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
    "Orange set": 0
  };

  memberCard = false;
  totalPrice: number | null = null;

  constructor(private calculatorService: CalculatorService) {}

  calculate() {
    this.calculatorService.calculatePrice(this.orders, this.memberCard).subscribe(
      response => {
        this.totalPrice = response.total_price;
      },
      error => {
        console.error('Error calculating price:', error);
      }
    );
  }

  orderKeys() {
    return Object.keys(this.orders);
  }


}
