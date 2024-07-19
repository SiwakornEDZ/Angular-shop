import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CalculatorComponent } from './calculator.component';
import {CalculatorService} from "../services/calculator.service";
import { of } from 'rxjs';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let calculatorService: CalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [CalculatorComponent],
      providers: [CalculatorService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    calculatorService = TestBed.inject(CalculatorService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total price', () => {
    spyOn(calculatorService, 'calculatePrice').and.returnValue(of({ total_price: 419.4 }));

    component.orders = {
      "Red set": 1,
      "Green set": 1,
      "Blue set": 1,
      "Yellow set": 1,
      "Pink set": 1,
      "Purple set": 1,
      "Orange set": 1
    };
    component.memberCard = true;
    component.calculate();

    expect(calculatorService.calculatePrice).toHaveBeenCalledWith(component.orders, component.memberCard);
    expect(component.totalPrice).toBe(419.4);
  });
});
