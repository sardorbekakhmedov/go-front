export interface Quiz {
    id: number;
    title: string;
    duration: number;
    questions: Question[];
}

export interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswerIndex: number;
    selectedAnswer?: number;
}

export interface UserAnswers {
  [questionId: number]: number;
}

