import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Student } from '../../../services/lesson3/student/student-service';

@Component({
  selector: 'app-student-card',
  imports: [],
  templateUrl: './student-card.html',
  styleUrl: './student-card.css',
})
export class StudentCard {

  @Input() student!: Student;
  @Output() edit = new EventEmitter<Student>();
  @Output() delete = new EventEmitter<number>();

  onEdit() {
    this.edit.emit(this.student);
  }

  onDelete() {
    this.delete.emit(this.student.id);
  }

}
