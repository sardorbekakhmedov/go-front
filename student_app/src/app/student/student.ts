import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface StudentPerson {
  id: number;
  name: string;
  score: number;
}

@Component({
  selector: 'app-student',
  imports: [CommonModule, FormsModule],
  templateUrl: './student.html',
  styleUrl: './student.css',
})
export class Student {

  students: StudentPerson[] = [];
  newName: string = '';
  newScore: number | null = null;

  addStudent() {
    if (this.newName && this.newScore !== null) {
      const newStudent: StudentPerson = {
        id: Date.now(),
        name: this.newName,
        score: this.newScore
      };
      this.students.push(newStudent);
      
      this.newName = '';
      this.newScore = null;
    }
  }

  deleteStudent(id: number) {
    this.students = this.students.filter(s => s.id !== id);
  }

  getScoreColor(score: number): string {
    if (score >= 90) return '#2ecc71'; 
    if (score >= 60) return '#f1c40f'; 
    return '#e74c3c'; 
  }
}
