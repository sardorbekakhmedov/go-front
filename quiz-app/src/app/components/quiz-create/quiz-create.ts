import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuizService } from '../../data/services/quiz-service';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { Quiz, Question } from '../../data/interfaces/quiz-model';

@Component({
  selector: 'app-quiz-create',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf],
  templateUrl: './quiz-create.html',
  styleUrl: './quiz-create.css'
})
export class QuizCreate {
  private fb = inject(FormBuilder);
  private quizService = inject(QuizService);
  private router = inject(Router);

  quizForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    duration: [10, [Validators.required, Validators.min(1)]],
    questions: this.fb.array([])
  });

  constructor() {
    this.addQuestion(); 
  }

  get questions() {
    return this.quizForm.get('questions') as FormArray;
  }

  addQuestion() {
    const questionGroup = this.fb.group({
      text: ['', Validators.required],
      options: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required)
      ]),
      correctAnswerIndex: [0, [Validators.required, Validators.min(0), Validators.max(3)]]
    });
    this.questions.push(questionGroup);
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  onSubmit() {
    if (this.quizForm.valid) {
      const formValue = this.quizForm.value;
      
      const newQuiz: Quiz = {
        id: Date.now(), 
        title: formValue.title,
        duration: formValue.duration,
        questions: formValue.questions.map((q: Question, index: number) => ({
          id: index + 1,
          text: q.text,
          options: q.options,
          correctAnswerIndex: q.correctAnswerIndex
        }))
      };

      this.quizService.addQuiz(newQuiz);
      this.router.navigate(['/']);
    }
  }
}