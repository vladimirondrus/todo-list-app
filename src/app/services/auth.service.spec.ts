import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [AuthService, LocalStorageService]
    });
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start as not authenticated', () => {
    expect(service.isAuthenticated()).toBe(false);
    expect(service.user()).toBeNull();
  });

  it('should logout and clear user', () => {
    service.logout();
    expect(service.isAuthenticated()).toBe(false);
    expect(service.user()).toBeNull();
  });

  it('should restore user from localStorage', () => {
    const mockUser = {
      id: '123',
      name: 'Test User',
      email: 'test@example.com',
      imageUrl: 'https://example.com/photo.jpg'
    };
    localStorage.setItem('auth_user', JSON.stringify(mockUser));

    // Re-create service to trigger constructor
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [AuthService, LocalStorageService]
    });
    const newService = TestBed.inject(AuthService);
    expect(newService.isAuthenticated()).toBe(true);
    expect(newService.user()?.name).toBe('Test User');
  });
});
