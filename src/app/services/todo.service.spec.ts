import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { LocalStorageService } from './local-storage.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [TodoService, LocalStorageService]
    });
    service = TestBed.inject(TodoService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with empty todos', () => {
    expect(service.todos()).toEqual([]);
  });

  it('should add a todo', () => {
    const todo = service.addTodo('Test task', 'A description');
    expect(todo.title).toBe('Test task');
    expect(todo.description).toBe('A description');
    expect(todo.completed).toBe(false);
    expect(service.todos().length).toBe(1);
  });

  it('should update a todo', () => {
    const todo = service.addTodo('Original');
    service.updateTodo(todo.id, { title: 'Updated' });
    expect(service.todos()[0].title).toBe('Updated');
  });

  it('should delete a todo', () => {
    const todo = service.addTodo('To delete');
    service.deleteTodo(todo.id);
    expect(service.todos().length).toBe(0);
  });

  it('should toggle a todo', () => {
    const todo = service.addTodo('Toggle me');
    expect(service.todos()[0].completed).toBe(false);
    service.toggleTodo(todo.id);
    expect(service.todos()[0].completed).toBe(true);
    service.toggleTodo(todo.id);
    expect(service.todos()[0].completed).toBe(false);
  });

  it('should track completed count', () => {
    const t1 = service.addTodo('Task 1');
    service.addTodo('Task 2');
    service.toggleTodo(t1.id);
    expect(service.completedCount()).toBe(1);
    expect(service.pendingCount()).toBe(1);
  });

  it('should get a todo by id', () => {
    const todo = service.addTodo('Find me');
    const found = service.getTodoById(todo.id);
    expect(found).toBeDefined();
    expect(found!.title).toBe('Find me');
  });

  it('should return undefined for unknown id', () => {
    expect(service.getTodoById('nonexistent')).toBeUndefined();
  });

  it('should persist todos to localStorage', () => {
    service.addTodo('Persisted');
    const stored = localStorage.getItem('todos');
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed.length).toBe(1);
    expect(parsed[0].title).toBe('Persisted');
  });
});
