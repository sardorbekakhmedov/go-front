import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QuizService } from '../../data/services/quiz-service';
import { Question } from '../../data/interfaces/quiz-model';
import { NgClass } from "@angular/common";
import { interval, map, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-question-list',
  imports: [RouterLink, NgClass],
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
  });

  remainingTime = signal<number>(0);
  private timerSub?: Subscription;

  displayTime = computed(() => {
    const minutes = Math.floor(this.remainingTime() / 60);
    const seconds = this.remainingTime() % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });  

 constructor() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (!isNaN(id)) {
        this.quizService.getQuizById(id);
        const duration = this.quizService.selectedQuiz()?.duration || 10;
        this.startTimer(duration * 60);
      }

      const lastIndex = localStorage.getItem('lastQuestionId');
      if (lastIndex) 
        this.currentIndex.set(Number(lastIndex));
    });

    effect(() => {
      localStorage.setItem('lastQuestionId', this.currentIndex().toString());
    });
  }

  startTimer(seconds: number) {
    this.remainingTime.set(seconds);
    
    this.timerSub = interval(1000)
    .pipe(
      take(seconds),
      map(v => seconds - (v + 1)) )
    .subscribe({
      next: (val) => {
        this.remainingTime.set(val);
        if (val <= 0) 
          this.finishQuiz();
      }
    });
  }

  ngOnDestroy() {
    this.timerSub?.unsubscribe();
  }

  getOptionClass(question: Question, index: number) {
    if (!this.isAnswered(question.id)) return '';
    if (index === question.correctAnswerIndex) return 'correct';
    if (this.quizService.userAnswers()[question.id] === index) return 'incorrect';
    return '';
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

  selectedOptionSave(optionIndex: number) {
    const question = this.currentQuestion();
    if(question) {
      this.quizService.saveAnswer(question.id, optionIndex);
    }
  }

  isAnswered(questionId: number): boolean {
    return this.quizService.userAnswers()[questionId] !== undefined;
  }

  finishQuiz() {
    this.timerSub?.unsubscribe();
    this.router.navigate(['/result']); 
  }


  clearLocalStorage() {
    this.quizService.clearStorage();
  }

}
