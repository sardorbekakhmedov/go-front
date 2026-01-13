import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Counter } from "./counter/counter";
import { Calculator } from "./calculator/calculator";
import { Student } from "./student-list/student-list";
import { Todolist } from "./todolist/todolist";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Counter, Calculator, Student, Todolist],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-tasks');
}