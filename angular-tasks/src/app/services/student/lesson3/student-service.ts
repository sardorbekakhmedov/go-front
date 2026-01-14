import { Injectable } from '@angular/core';

export interface Student {
  id: number;
  name: string | null;
  score: number;
  grade: string;
  subject: string;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  
  students: Student[] = [];

  getAll(): Student[] {
    return this.students;
  }

  getById(id: number): Student | undefined {
    return this.students.find(s => s.id === id);
  }

  add(name: string, score: number, grade: string, subject: string): void {
    const newStudent: Student = {
      id: Date.now(),
      name:  name,
      score: score,
      grade: grade,
      subject: subject
    }
    this.students.push(newStudent);
  }

  update(id:number, name: string, score: number): boolean {

    let student = this.students.find(s => s.id == id);

    if(!student)
        return false;

    student.name = name;
    student.score = score;

    return true;
  }

  delete(id: number): void {
    this.students = this.students.filter(s => s.id !== id)
  }

  getBySubject(subject: string): Student[] {
    return this.students.filter(s => s.subject === subject);
  }

  getByScore(score: number): Student[] {
    return this.students.filter(s => s.score === score);
  }

  getAvgScore(): number {
    if(this.students.length === 0) 
      return 0;

    return this.students.reduce( (sum, student) => sum + student.score, 0) / this.students.length;
  }

  getTopStudent(): Student | undefined {
     if(this.students.length === 0) return undefined;

     return this.students.reduce( (topScore, currentStudent) => currentStudent.score > topScore.score ? currentStudent : topScore);
  }
}
