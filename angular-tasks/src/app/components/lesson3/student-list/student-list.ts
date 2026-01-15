import { Component } from '@angular/core';
import { Student, StudentService } from '../../../services/lesson3/student-service';
import { StudentForm } from "../student-form/student-form";
import { StudentCard } from "../student-card/student-card";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-list',
  imports: [StudentForm, StudentCard, CommonModule ],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList {
  students: Student[] = [];
  selectedStudent?: Student;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.students = this.studentService.getAll();
  }

  handleSave(data: {id?: number, name: string, score: number, grade: string, subject: string}) {
    if(data.id){ 
      this.studentService.update(data.id, data.name, data.score, data.grade, data.subject );
    } else {
      this.studentService.add(data.name, data.score, data.grade, data.subject);
    }
    this.selectedStudent = undefined;
    this.loadStudents();
  }

  handleEdit(student: Student) {
    this.selectedStudent = student;
  }

  handleDelete(id: number) {
    this.studentService.delete(id);
    this.loadStudents();
  }
}
