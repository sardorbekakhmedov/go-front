import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Counter } from "./components/lesson1/counter/counter";
import { Calculator } from "./components/lesson1/counter/calculator/calculator";
import { Student } from "./components/lesson2/student-list/student-list";
import { Todolist } from "./components/lesson2/student-list/todolist/todolist";
import { StudentForm } from "./components/lesson3/student-form/student-form";
import { StudentList } from "./components/lesson3/student-list/student-list";
import { Home } from "./components/lesson4/home/home";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Counter, Calculator, Student, Todolist, StudentForm, StudentList, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-tasks');
}