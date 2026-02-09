import { Injectable, signal, computed, NgZone } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../environments/environment';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
}

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_KEY = 'auth_user';
  private readonly userSignal = signal<UserProfile | null>(null);

  readonly user = this.userSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.userSignal() !== null);

  constructor(
    private storage: LocalStorageService,
    private ngZone: NgZone
  ) {
    const savedUser = this.storage.getItem<UserProfile>(this.USER_KEY);
    if (savedUser) {
      this.userSignal.set(savedUser);
    }
  }

  initializeGoogleAuth(): void {
    if (typeof google === 'undefined') {
      return;
    }
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response: any) => this.handleCredentialResponse(response)
    });
  }

  renderGoogleButton(element: HTMLElement): void {
    if (typeof google === 'undefined') {
      return;
    }
    google.accounts.id.renderButton(element, {
      theme: 'outline',
      size: 'large',
      text: 'signin_with',
      shape: 'rectangular'
    });
  }

  private handleCredentialResponse(response: any): void {
    const payload = this.decodeJwtPayload(response.credential);
    if (payload) {
      const user: UserProfile = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        imageUrl: payload.picture
      };
      this.ngZone.run(() => {
        this.userSignal.set(user);
        this.storage.setItem(this.USER_KEY, user);
      });
    }
  }

  private decodeJwtPayload(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch {
      return null;
    }
  }

  logout(): void {
    this.userSignal.set(null);
    this.storage.removeItem(this.USER_KEY);
  }
}
