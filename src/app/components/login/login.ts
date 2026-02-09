import { Component, signal, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements AfterViewInit {
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.authService.initializeGoogleAuth();
    if (this.googleBtn) {
      this.authService.renderGoogleButton(this.googleBtn.nativeElement);
    }
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }

  navigateToTodos(): void {
    this.router.navigate(['/todos']);
  }
}
