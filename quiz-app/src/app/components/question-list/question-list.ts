import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QuizService } from '../../data/services/quiz-service';

@Component({
  selector: 'app-question-list',
  imports: [RouterLink],
  templateUrl: './question-list.html',
  styleUrl: './question-list.css',
})
export class QuestionList {
  private route = inject(ActivatedRoute);
  private router = inject(Router)
  public quizService = inject(QuizService);

  currentIndex = signal<number>(0);

  currentQuestion = computed(() => {
    const quiz = this.quizService.selectedQuiz();
    return quiz?.questions ? quiz.questions[this.currentIndex()] : null;
  })

  constructor() {
    /*this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (!isNaN(id)) 
        this.quizService.getQuizById(id);
    
    });*/

    const id = this.route.snapshot.paramMap.get('id');

   if (id)
      this.quizService.getQuizById(Number(id));
  }

  nextQuestion() {
    const total = this.quizService.selectedQuiz()?.questions.length || 0;
    if(this.currentIndex() < total-1) {
      this.currentIndex.update(val => val + 1);
    }
  }

  prevQuestion() {
    if(this.currentIndex() > 0) {
      this.currentIndex.update(val => val - 1)
    }
  }

  selectOption(optionIndex: number) {
    const question = this.currentQuestion();
    if(question) {
      this.quizService.saveAnswer(question.id, optionIndex);
    }
  }

  isAnswered(questionId: number): boolean {
    return this.quizService.userAnswers()[questionId] !== undefined;
  }

  finishQuiz() {
    // Bu yerda natijani hisoblash yoki shunchaki o'tish mumkin
    this.router.navigate(['/result']); 
  }

}
