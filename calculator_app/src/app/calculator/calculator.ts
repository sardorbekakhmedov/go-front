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

  num1: number = 0;
  num2: number = 0;
  result: number = 0;

  sum(): void {
   this.result = (this.num1 + this.num2);
  }
  
}
