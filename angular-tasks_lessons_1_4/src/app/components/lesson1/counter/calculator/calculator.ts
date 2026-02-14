import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  imports: [CommonModule ,FormsModule],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css',
})
export class Calculator {

  num1?: number;
  num2?: number;
  result?: number;

  sum(): void {
    if(this.num1 && this.num2)
      this.result = (this.num1 + this.num2);
  }

  subtract(): void {
    if(this.num1 && this.num2)
      this.result = (this.num1 - this.num2);
  }

  division(){
    if(this.num1 && this.num2)
      this.result = (this.num1 / this.num2);
  }

  multiplication(){
    if(this.num1 && this.num2)
      this.result = (this.num1 * this.num2);
  }

  clear(){
      this.num1 = undefined;
      this.num2 = undefined;
      this.result = undefined;
  }
  
}
