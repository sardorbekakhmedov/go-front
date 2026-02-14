import { effect, inject, Injectable, signal } from "@angular/core"
import { HttpClient } from "@angular/common/http";
import { Quiz } from "../interfaces/quiz-model";

@Injectable({
    providedIn: 'root'
})
export class QuizService {
    private apiUrl:string = 'https://my.api.mockaroo.com/questions?key=92fae720';
    private pathData = "assets/data.json"
    private http = inject(HttpClient);

    quizzes = signal<Quiz[]>([]);
    selectedQuiz = signal<Quiz | undefined>(undefined);
    userAnswers = signal<{ [key: number]: number }>({})

    constructor() {
        this.loadQuizzes();
        
        const saved = localStorage.getItem('userAnswers');
        if (saved) {
            this.userAnswers.set(JSON.parse(saved));
        }

        effect(() => {
            localStorage.setItem('userAnswers', JSON.stringify(this.userAnswers()));
        });
    }

    loadQuizzes() {
        this.http.get<Quiz[]>(this.pathData)
        .subscribe({
            next: (data) => this.quizzes.set(data),
            error: (err) => console.log('Quiz yuklashda xatolik: ', err)
        });
    }

    getQuizById(id: number) {
        let quiz = this.quizzes().find(x => x.id == id);

        if(quiz) {
            this.selectedQuiz.set(quiz);
            localStorage.setItem('lastQuizId', id.toString());
        } else {
            this.loadQuizzes();
            quiz = this.quizzes().find(x => x.id == id);
            if(quiz) 
                this.selectedQuiz.set(quiz);
                localStorage.setItem('lastQuizId', id.toString());
        }
    }

    saveAnswer(questionId: number, answerIndex: number) {
        this.userAnswers.update( prev => ({
            ...prev,
            [questionId]: answerIndex
        }))
    }

    private loadFromLocalStorage() {
        const savedAnswers = localStorage.getItem('userAnswers');
        if (savedAnswers) {
            this.userAnswers.set(JSON.parse(savedAnswers));
        }
    }

    clearStorage() {
        localStorage.removeItem('userAnswers');
        localStorage.removeItem('lastQuizId');
        this.userAnswers.set({});
    }

}