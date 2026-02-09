import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { AuthService } from '../../services/auth.service';
import { Todo } from '../../models/todo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css'
})
export class TodoList {
  newTitle = signal('');
  newDescription = signal('');
  editingTodo = signal<Todo | null>(null);
  editTitle = signal('');
  editDescription = signal('');
  filter = signal<'all' | 'active' | 'completed'>('all');

  readonly filteredTodos = computed(() => {
    const todos = this.todoService.todos();
    switch (this.filter()) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  });

  constructor(
    public todoService: TodoService,
    public authService: AuthService,
    private router: Router
  ) {}

  addTodo(): void {
    const title = this.newTitle().trim();
    if (!title) return;
    this.todoService.addTodo(title, this.newDescription().trim());
    this.newTitle.set('');
    this.newDescription.set('');
  }

  startEdit(todo: Todo): void {
    this.editingTodo.set(todo);
    this.editTitle.set(todo.title);
    this.editDescription.set(todo.description);
  }

  saveEdit(): void {
    const todo = this.editingTodo();
    if (!todo) return;
    const title = this.editTitle().trim();
    if (!title) return;
    this.todoService.updateTodo(todo.id, {
      title,
      description: this.editDescription().trim()
    });
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.editingTodo.set(null);
    this.editTitle.set('');
    this.editDescription.set('');
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id);
  }

  toggleTodo(id: string): void {
    this.todoService.toggleTodo(id);
  }

  setFilter(filter: 'all' | 'active' | 'completed'): void {
    this.filter.set(filter);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  updateNewTitle(value: string): void {
    this.newTitle.set(value);
  }

  updateNewDescription(value: string): void {
    this.newDescription.set(value);
  }

  updateEditTitle(value: string): void {
    this.editTitle.set(value);
  }

  updateEditDescription(value: string): void {
    this.editDescription.set(value);
  }
}
