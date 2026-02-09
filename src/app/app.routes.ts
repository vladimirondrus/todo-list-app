import { Routes } from '@angular/router';
import { TodoList } from './components/todo-list/todo-list';
import { Login } from './components/login/login';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'todos', component: TodoList },
  { path: '**', redirectTo: '/login' }
];
