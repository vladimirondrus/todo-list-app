import { Injectable, signal, computed } from '@angular/core';
import { Todo } from '../models/todo.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly STORAGE_KEY = 'todos';
  private readonly todosSignal = signal<Todo[]>([]);

  readonly todos = this.todosSignal.asReadonly();
  readonly completedCount = computed(() => this.todosSignal().filter(t => t.completed).length);
  readonly pendingCount = computed(() => this.todosSignal().filter(t => !t.completed).length);

  constructor(private storage: LocalStorageService) {
    this.loadTodos();
  }

  private loadTodos(): void {
    const todos = this.storage.getItem<Todo[]>(this.STORAGE_KEY);
    if (todos) {
      this.todosSignal.set(todos);
    }
  }

  private saveTodos(): void {
    this.storage.setItem(this.STORAGE_KEY, this.todosSignal());
  }

  addTodo(title: string, description: string = ''): Todo {
    const now = new Date();
    const todo: Todo = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      createdAt: now,
      updatedAt: now
    };
    this.todosSignal.update(todos => [...todos, todo]);
    this.saveTodos();
    return todo;
  }

  updateTodo(id: string, changes: Partial<Pick<Todo, 'title' | 'description' | 'completed'>>): void {
    this.todosSignal.update(todos =>
      todos.map(todo =>
        todo.id === id
          ? { ...todo, ...changes, updatedAt: new Date() }
          : todo
      )
    );
    this.saveTodos();
  }

  deleteTodo(id: string): void {
    this.todosSignal.update(todos => todos.filter(todo => todo.id !== id));
    this.saveTodos();
  }

  toggleTodo(id: string): void {
    this.todosSignal.update(todos =>
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      )
    );
    this.saveTodos();
  }

  getTodoById(id: string): Todo | undefined {
    return this.todosSignal().find(todo => todo.id === id);
  }
}
