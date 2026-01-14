import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Student } from '../../../services/lesson3/student/student-service';

@Component({
  selector: 'app-student-form',
  imports: [FormsModule ],
  templateUrl: './student-form.html',
  styleUrl: './student-form.css',
})
export class StudentForm {

  @Input() student?: Student;
  @Output() save = new EventEmitter<{name: string, score: number, grade: string, subject: string, id?: number}>();

  name: string = '';
  score: number | null = null;
  grade: string = '';
  subject: string = '';

  ngOnChanges(): void {
    if(this.student){
      this.name = this.student.name || '';
      this.score = this.student.score;
      this.grade = this.student.grade;
      this.subject = this.student.subject;
    }
  }

  onSubmit() {
    if(!this.name || this.score === null || !this.grade || !this.subject) return;

    this.save.emit({
      id: this.student?.id,
      name: this.name,
      score: this.score,
      grade: this.grade,
      subject: this.subject
    });

    // Formni tozalash
    this.name = '';
    this.score = null;
    this.grade = '';
    this.subject = '';
  }

}
