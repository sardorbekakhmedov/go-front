import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TodoItem {
  id: number;
  task: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-todolist',
  imports: [CommonModule, FormsModule],
  templateUrl: './todolist.html',
  styleUrl: './todolist.css',
})
export class Todolist {

  todos: TodoItem[] = [];
  newTask: string = '';
  filterStatus: 'all' | 'completed' | 'pending' = 'all';

  addTodo() {
    const newTodo: TodoItem = {
        id: Date.now(),
        task: this.newTask,
        isCompleted: false
      }

      this.todos.push(newTodo);
      this.newTask = '';
  }

  toggleComplete(id: number) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) todo.isCompleted = !todo.isCompleted;
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(t => t.id !== id);
  }

  get filteredTodos() {
    if (this.filterStatus === 'completed') return this.todos.filter(t => t.isCompleted);
    if (this.filterStatus === 'pending') return this.todos.filter(t => !t.isCompleted);
    return this.todos;
  }

}
