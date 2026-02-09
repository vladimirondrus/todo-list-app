import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve an item', () => {
    service.setItem('test', { name: 'value' });
    const result = service.getItem<{ name: string }>('test');
    expect(result).toEqual({ name: 'value' });
  });

  it('should return null for non-existent key', () => {
    const result = service.getItem('missing');
    expect(result).toBeNull();
  });

  it('should remove an item', () => {
    service.setItem('test', 'data');
    service.removeItem('test');
    const result = service.getItem('test');
    expect(result).toBeNull();
  });

  it('should handle invalid JSON gracefully', () => {
    localStorage.setItem('bad', 'not-json');
    const result = service.getItem('bad');
    expect(result).toBeNull();
  });
});
