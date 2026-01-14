import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Counter } from "./components/counter/counter";
import { Calculator } from "./components/calculator/calculator";
import { Student } from "./components/student-list/student-list";
import { Todolist } from "./components/todolist/todolist";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Counter, Calculator, Student, Todolist],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-tasks');
}