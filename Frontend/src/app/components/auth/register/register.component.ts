import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-register',
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
          <h2 class="auth-title">Create Account</h2>
          <p class="auth-sub">Start building your professional portfolio today</p>

          <div class="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" [(ngModel)]="name" />
          </div>
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="you@email.com" [(ngModel)]="email" />
          </div>
          <div class="form-group">
            <label>Password</label>
            <div class="input-wrap">
              <input [type]="showPass ? 'text' : 'password'" placeholder="Min. 6 characters" [(ngModel)]="password" />
              <button class="toggle-pass" (click)="showPass = !showPass" type="button">
                <i [class]="showPass ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>

          <!-- Password strength indicator -->
          <div class="pass-strength" *ngIf="password.length > 0">
            <div class="strength-bar">
              <div class="strength-fill" [style.width]="passStrength + '%'"
                [style.background]="passStrength < 40 ? '#ef4444' : passStrength < 70 ? '#f59e0b' : '#10b981'">
              </div>
            </div>
            <span class="strength-text"
              [style.color]="passStrength < 40 ? '#ef4444' : passStrength < 70 ? '#f59e0b' : '#10b981'">
              {{ passStrength < 40 ? 'Weak' : passStrength < 70 ? 'Medium' : 'Strong' }}
            </span>
          </div>

          <button class="btn btn-primary w-full" (click)="register()" [disabled]="loading">
            <span class="spinner-sm" *ngIf="loading"></span>
            <i class="fas fa-rocket" *ngIf="!loading"></i>
            {{ loading ? 'Creating Account...' : 'Create Free Account' }}
          </button>

          <p class="auth-link">
            Already have an account? <a routerLink="/auth/login">Sign in</a>
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
  .orb-1 { width: 500px; height: 500px; background: var(--navy-light); top: -150px; left: -100px; }
  .orb-2 { width: 400px; height: 400px; background: var(--gold); bottom: -120px; right: -80px; }

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
    font-size: var(--text-sm); margin-bottom: 36px;
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
  .pass-strength { display: flex; align-items: center; gap: 14px; margin: -8px 0 20px; }
  .pass-strength .strength-bar { flex: 1; height: 4px; }
  .strength-text { font-size: var(--text-xs); font-weight: 700; min-width: 54px; font-family: var(--font-mono); }
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
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  showPass = false;
  loading = false;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  get passStrength(): number {
    const p = this.password;
    let score = 0;
    if (p.length >= 6) score += 30;
    if (p.length >= 10) score += 20;
    if (/[A-Z]/.test(p)) score += 20;
    if (/[0-9]/.test(p)) score += 15;
    if (/[^A-Za-z0-9]/.test(p)) score += 15;
    return Math.min(score, 100);
  }

  register() {
    if (!this.name || !this.email || !this.password) {
      this.toastService.show('Please fill all fields', 'error');
      return;
    }
    if (this.password.length < 6) {
      this.toastService.show('Password must be at least 6 characters', 'error');
      return;
    }
    this.loading = true;
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: () => {
        this.toastService.show('Account created! Let\'s build your portfolio!');
        this.router.navigate(['/builder']);
      },
      error: (err) => {
        this.toastService.show(err.error?.message || 'Registration failed', 'error');
        this.loading = false;
      }
    });
  }
}