import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  getItem<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (data === null) {
      return null;
    }
    try {
      return JSON.parse(data) as T;
    } catch {
      return null;
    }
  }

  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
