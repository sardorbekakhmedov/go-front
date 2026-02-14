import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { QuizService } from './data/services/quiz-service';
import { QuizList } from "./components/quiz-list/quiz-list";

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, QuizList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('quiz-app');
  quizService = inject(QuizService);

  clearLocalStorage() {
    this.quizService.clearStorage();
  }
}
