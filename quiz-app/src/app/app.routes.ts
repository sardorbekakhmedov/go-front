import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'quiz',
        loadComponent: () => import('./components/quiz-list/quiz-list')
        .then(x => x.QuizList)
    },
    {
        path: 'question/:id',
        loadComponent: () => import('./components/question-list/question-list')
        .then(x => x.QuestionList)
    }
];
