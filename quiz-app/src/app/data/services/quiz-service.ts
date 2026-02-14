import { inject, Injectable, signal, WritableSignal } from "@angular/core"
import { HttpClient } from "@angular/common/http";
import { Quiz } from "../interfaces/quiz-model";

@Injectable({
    providedIn: 'root'
})
export class QuizService {
    private apiUrl:string = 'https://my.api.mockaroo.com/questions?key=92fae720';
    private http = inject(HttpClient);

    quizzes = signal<Quiz[]>([]);
    selectedQuiz = signal<Quiz | undefined>(undefined);
    userAnswers = signal<{ [key: number]: number }>({})

    constructor() {
        this.loadQuizzes();
    }

    loadQuizzes() {
        this.http.get<Quiz[]>(this.apiUrl)
        .subscribe({
            next: (data) => this.quizzes.set(data),
            error: (err) => console.log('Quiz yuklashda xatolik: ', err)
        });
    }

    getQuizById(id: number) {
        let quiz = this.quizzes().find(x => x.id == id);

        if(quiz) {
            this.selectedQuiz.set(quiz);
        } else {
            this.loadQuizzes();
            quiz = this.quizzes().find(x => x.id == id);
            if(quiz) 
                this.selectedQuiz.set(quiz);
        }
    }

    saveAnswer(questionId: number, answerIndex: number) {
        this.userAnswers.update( prev => ({
            ...prev,
            [questionId]: answerIndex
        }))
    }

}