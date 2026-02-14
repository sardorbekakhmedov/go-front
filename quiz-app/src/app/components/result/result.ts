import { Component, computed, inject } from '@angular/core';
import { QuizService } from '../../data/services/quiz-service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Question } from '../../data/interfaces/quiz-model';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './result.html',
  styleUrl: './result.css'
})
export class Result {
  public quizService = inject(QuizService);

  constructor() {
    if (!this.quizService.selectedQuiz()) {
      const lastId = localStorage.getItem('lastQuizId');
      if (lastId) {
        this.quizService.getQuizById(Number(lastId));
      }
    }
  }

  results = computed(() => {
    const quiz = this.quizService.selectedQuiz();
    const answers = this.quizService.userAnswers();
    
    let correctCount = 0;
    
    if (quiz) {
      for (let i = 0; i < quiz.questions.length; i++) {
        const q = quiz.questions[i];
        if (answers[q.id] === q.correctAnswerIndex) {
          correctCount++;
        }
      }
    }

    const total = quiz?.questions.length || 0;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    return {
      correct: correctCount,
      total: total,
      wrong: total - correctCount,
      percent: percentage,
      passed: percentage >= 70 
    };
  });

  isCorrect(question: Question): boolean {
        const userAnswer = this.quizService.userAnswers()[question.id];
        return userAnswer === question.correctAnswerIndex;
  }

  restart() {
      this.quizService.clearStorage();
  }

}