import { Component, inject } from '@angular/core';
import { QuizService } from '../../data/services/quiz-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-quiz-list',
  imports: [RouterLink],
  templateUrl: './quiz-list.html',
  styleUrl: './quiz-list.css',
})
export class QuizList {

    quizService = inject(QuizService);

   constructor() {
    console.log('Quizzes: -> ');
    console.log(this.quizService.quizzes);
   }


}
