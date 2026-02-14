import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./app')
        .then(x => x.App)
    },
    {
        path: 'quiz',
        loadComponent: () => import('./components/quiz-list/quiz-list')
        .then(x => x.QuizList)
    },
    {
        path: 'question/:id',
        loadComponent: () => import('./components/question-list/question-list')
        .then(x => x.QuestionList)
    },
    {
        path: 'result',
        loadComponent: () => import('./components/result/result')
        .then(x => x.Result)
    },
     {
        path: 'add',
        loadComponent: () => import('./components/quiz-create/quiz-create')
        .then(x => x.QuizCreate)
    }
];

