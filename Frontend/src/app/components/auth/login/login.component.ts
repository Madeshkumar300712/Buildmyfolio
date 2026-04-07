import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-page bg-grid">
      <div class="auth-bg">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
      </div>
      <div class="auth-container">
        <div class="auth-brand">
          <div class="brand-icon"><i class="fas fa-layer-group"></i></div>
          <span>Build<span class="accent">My</span>Folio</span>
        </div>
        <div class="auth-card glass">
          <h2 class="auth-title">Welcome Back</h2>
          <p class="auth-sub">Sign in to continue building your portfolio</p>

          <div class="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="you@email.com" [(ngModel)]="email" />
          </div>
          <div class="form-group">
            <label>Password</label>
            <div class="input-wrap">
              <input [type]="showPass ? 'text' : 'password'" placeholder="••••••••" [(ngModel)]="password" />
              <button class="toggle-pass" (click)="showPass = !showPass" type="button">
                <i [class]="showPass ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>

          <button class="btn btn-primary w-full" (click)="login()" [disabled]="loading">
            <span class="spinner-sm" *ngIf="loading"></span>
            <i class="fas fa-arrow-right" *ngIf="!loading"></i>
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>

          <p class="auth-link">
            Don't have an account? <a routerLink="/auth/register">Create one free</a>
          </p>
          <a routerLink="/" class="back-link"><i class="fas fa-arrow-left"></i> Back to Home</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
  .auth-page {
    min-height: 100vh; display: flex; align-items: center;
    justify-content: center; position: relative; overflow: hidden;
    background: var(--bg-primary);
  }
  .auth-bg { position: absolute; inset: 0; pointer-events: none; }
  .orb { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.07; }
  .orb-1 { width: 500px; height: 500px; background: var(--gold); top: -150px; right: -100px; }
  .orb-2 { width: 400px; height: 400px; background: var(--navy-light); bottom: -120px; left: -80px; }

  .auth-container { width: 100%; max-width: 480px; padding: 28px; position: relative; z-index: 1; }

  .auth-brand {
    display: flex; align-items: center; gap: 12px; justify-content: center;
    margin-bottom: 36px; font-family: var(--font-display);
    font-size: 1.7rem; font-weight: 700; color: var(--text-primary);
  }
  .brand-icon {
    width: 42px; height: 42px;
    background: linear-gradient(135deg, var(--gold-light), var(--gold-dark));
    border-radius: 12px; display: flex; align-items: center; justify-content: center;
    font-size: 1rem; color: #000; box-shadow: 0 4px 16px rgba(201,168,76,0.3);
  }
  .accent { color: var(--gold); }

  .auth-card {
    padding: 48px 44px; border-radius: 24px; animation: fadeInUp 0.5s ease;
    border: 1px solid var(--gold-border);
    background: linear-gradient(145deg, var(--bg-card), var(--bg-secondary));
  }

  .auth-title {
    font-family: var(--font-display); font-size: 2.2rem; font-weight: 700;
    text-align: center; margin-bottom: 8px; color: var(--text-white);
  }
  .auth-sub {
    text-align: center; color: var(--text-secondary);
    font-size: var(--text-sm); margin-bottom: 36px; line-height: 1.6;
  }

  .input-wrap { position: relative; }
  .input-wrap input { padding-right: 50px; }
  .toggle-pass {
    position: absolute; right: 16px; top: 50%;
    transform: translateY(-50%); background: none;
    border: none; color: var(--text-muted); cursor: pointer;
    padding: 4px; transition: var(--transition); font-size: 1rem;
  }
  .toggle-pass:hover { color: var(--gold); }

  .w-full { width: 100%; justify-content: center; font-size: var(--text-sm); padding: 16px; }
  .spinner-sm {
    width: 18px; height: 18px;
    border: 2px solid rgba(0,0,0,0.2);
    border-top-color: #000; border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  .auth-link {
    text-align: center; margin-top: 22px;
    font-size: var(--text-sm); color: var(--text-secondary);
  }
  .auth-link a { color: var(--gold); text-decoration: none; font-weight: 700; }
  .auth-link a:hover { color: var(--gold-light); }

  .back-link {
    display: flex; align-items: center; justify-content: center;
    gap: 8px; color: var(--text-muted); text-decoration: none;
    font-size: var(--text-xs); margin-top: 18px; transition: var(--transition);
  }
  .back-link:hover { color: var(--gold); }
`]
})
export class LoginComponent {
  email = '';
  password = '';
  showPass = false;
  loading = false;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  login() {
    if (!this.email || !this.password) {
      this.toastService.show('Please fill all fields', 'error');
      return;
    }
    this.loading = true;
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.toastService.show('Welcome back!');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.toastService.show(err.error?.message || 'Login failed', 'error');
        this.loading = false;
      }
    });
  }
}