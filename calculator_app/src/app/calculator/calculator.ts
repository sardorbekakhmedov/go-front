import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  imports: [],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css',
})
export class Calculator {

  displayValue: string = '';

  appendToDisplay(val: string) {
    this.displayValue += val;
  }

  clearDisplay() {
    this.displayValue = '';
  }

  deleteLast() {
    this.displayValue = this.displayValue.slice(0, -1);
  }

  calculate() {
    try {
      this.displayValue = eval(this.displayValue).toString();
    } catch (e) {
      this.displayValue = 'Xato!';
      setTimeout(() => this.clearDisplay(), 1500);
    }
  }

}
