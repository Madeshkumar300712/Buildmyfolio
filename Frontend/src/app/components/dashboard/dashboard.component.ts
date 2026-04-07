import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PortfolioService } from '../../services/portfolio.service';
import { ToastService } from '../../services/toast.service';
import { Portfolio } from '../../models/portfolio.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard bg-grid">
      <!-- Sidebar -->
      <aside class="sidebar glass">
        <div class="sidebar-brand">
          <div class="brand-icon"><i class="fas fa-layer-group"></i></div>
          <span class="brand-name">Build<span class="accent">My</span>Folio</span>
        </div>
        <nav class="sidebar-nav">
          <a class="nav-item active"><i class="fas fa-gauge-high"></i> Dashboard</a>
          <a class="nav-item" routerLink="/builder"><i class="fas fa-pen-nib"></i> Edit Portfolio</a>
          <a class="nav-item" (click)="previewPortfolio()"><i class="fas fa-eye"></i> Preview</a>
        </nav>
        <div class="sidebar-bottom">
          <div class="user-info">
            <div class="user-avatar">{{ userInitial }}</div>
            <div>
              <div class="user-name">{{ userName }}</div>
              <div class="user-email">{{ userEmail }}</div>
            </div>
          </div>
          <button class="btn-icon logout" (click)="logout()">
            <i class="fas fa-right-from-bracket"></i>
          </button>
        </div>
      </aside>

      <!-- Main -->
      <main class="main-content">
        <div class="loading-wrap" *ngIf="loading">
          <div class="spinner"></div>
        </div>

        <ng-container *ngIf="!loading && portfolio">
          <!-- Header -->
          <div class="page-header">
            <div>
              <h1 class="page-title">Dashboard</h1>
              <p class="page-sub">Welcome back, {{ userName }}! Here's your portfolio overview.</p>
            </div>
            <div class="header-actions">
              <button class="btn btn-ghost" (click)="togglePublish()">
                <i [class]="portfolio.isPublished ? 'fas fa-eye-slash' : 'fas fa-globe'"></i>
                {{ portfolio.isPublished ? 'Unpublish' : 'Publish' }}
              </button>
              <a routerLink="/builder" class="btn btn-primary">
                <i class="fas fa-pen"></i> Edit Portfolio
              </a>
            </div>
          </div>

          <!-- Stats grid -->
          <div class="stats-grid">
            <div class="stat-card card">
              <div class="stat-icon" style="background:linear-gradient(135deg,#00d4ff,#0099cc)">
                <i class="fas fa-eye"></i>
              </div>
              <div class="stat-body">
                <div class="stat-value">{{ portfolio.views }}</div>
                <div class="stat-label">Portfolio Views</div>
              </div>
            </div>
            <div class="stat-card card">
              <div class="stat-icon" style="background:linear-gradient(135deg,#7c3aed,#5b21b6)">
                <i class="fas fa-chart-pie"></i>
              </div>
              <div class="stat-body">
                <div class="stat-value">{{ portfolio.strength }}%</div>
                <div class="stat-label">Portfolio Strength</div>
              </div>
            </div>
            <div class="stat-card card">
              <div class="stat-icon" style="background:linear-gradient(135deg,#10b981,#059669)">
                <i class="fas fa-code"></i>
              </div>
              <div class="stat-body">
                <div class="stat-value">{{ portfolio.skills.length }}</div>
                <div class="stat-label">Skills Listed</div>
              </div>
            </div>
            <div class="stat-card card">
              <div class="stat-icon" style="background:linear-gradient(135deg,#f59e0b,#d97706)">
                <i class="fas fa-folder-open"></i>
              </div>
              <div class="stat-body">
                <div class="stat-value">{{ portfolio.projects.length }}</div>
                <div class="stat-label">Projects Added</div>
              </div>
            </div>
          </div>

          <!-- Strength + suggestions -->
          <div class="row-two">
            <div class="strength-card card">
              <h3 class="card-title">Portfolio Strength</h3>
              <div class="strength-circle-wrap">
                <div class="strength-circle" [attr.data-val]="portfolio.strength">
                  <svg viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="10"/>
                    <circle cx="60" cy="60" r="50" fill="none"
                      stroke="url(#grad)" stroke-width="10"
                      stroke-linecap="round"
                      [attr.stroke-dasharray]="314"
                      [attr.stroke-dashoffset]="314 - (314 * portfolio.strength / 100)"
                      transform="rotate(-90 60 60)"/>
                    <defs>
                      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#7c3aed"/>
                        <stop offset="100%" stop-color="#00d4ff"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div class="circle-val">{{ portfolio.strength }}%</div>
                </div>
              </div>
              <div class="strength-tips">
                <div class="tip" *ngFor="let tip of suggestions">
                  <i [class]="tip.done ? 'fas fa-check-circle tip-done' : 'fas fa-circle tip-todo'"></i>
                  <span [class.done]="tip.done">{{ tip.text }}</span>
                </div>
              </div>
            </div>

            <!-- Share card -->
            <div class="share-card card">
              <h3 class="card-title">Share Your Portfolio</h3>
              <div class="share-status" [class.published]="portfolio.isPublished">
                <div class="status-dot"></div>
                <span>{{ portfolio.isPublished ? 'Published & Live' : 'Not Published' }}</span>
              </div>
              <div class="share-link-wrap" *ngIf="portfolio.isPublished">
                <input class="share-input" [value]="shareUrl" readonly />
                <button class="btn btn-outline" (click)="copyLink()">
                  <i class="fas fa-copy"></i> Copy
                </button>
              </div>
              <p class="share-hint" *ngIf="!portfolio.isPublished">
                Click "Publish" to generate a shareable link for your portfolio.
              </p>
              <div class="share-actions">
                <button class="btn btn-ghost" (click)="togglePublish()">
                  <i [class]="portfolio.isPublished ? 'fas fa-eye-slash' : 'fas fa-globe'"></i>
                  {{ portfolio.isPublished ? 'Unpublish' : 'Publish Portfolio' }}
                </button>
                <button class="btn btn-ghost" (click)="downloadPDF()" *ngIf="portfolio.isPublished">
                  <i class="fas fa-file-pdf"></i> Download PDF
                </button>
              </div>
            </div>
          </div>

          <!-- Sections status -->
          <div class="sections-status card">
            <h3 class="card-title">Sections Completion</h3>
            <div class="sections-grid">
              <div class="section-item" *ngFor="let s of sectionStatus">
                <div class="section-icon" [style.background]="s.color">
                  <i [class]="s.icon"></i>
                </div>
                <div class="section-info">
                  <span class="section-name">{{ s.name }}</span>
                  <span class="section-count">{{ s.count }} item{{ s.count !== 1 ? 's' : '' }}</span>
                </div>
                <div class="section-badge" [class.complete]="s.count > 0">
                  {{ s.count > 0 ? 'Done' : 'Empty' }}
                </div>
              </div>
            </div>
          </div>
        </ng-container>
      </main>
    </div>
  `,
  styles: [`
  .dashboard { display: flex; min-height: 100vh; background: var(--bg-primary); }

  /* Sidebar */
  .sidebar {
    width: 280px; min-height: 100vh; padding: 28px 22px;
    display: flex; flex-direction: column; position: fixed;
    top: 0; left: 0; bottom: 0; z-index: 50;
    border-right: 1px solid var(--border);
    border-top: none; border-bottom: none; border-left: none; border-radius: 0;
    background: linear-gradient(180deg, var(--bg-secondary), var(--bg-primary));
  }
  .sidebar-brand {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 44px; padding-bottom: 28px; border-bottom: 1px solid var(--border);
  }
  .brand-icon {
    width: 40px; height: 40px;
    background: linear-gradient(135deg, var(--gold-light), var(--gold-dark));
    border-radius: 11px; display: flex; align-items: center; justify-content: center;
    font-size: 0.95rem; color: #000; box-shadow: 0 4px 14px rgba(201,168,76,0.3);
  }
  .brand-name { font-family: var(--font-display); font-size: 1.35rem; font-weight: 700; }
  .accent { color: var(--gold); }

  .sidebar-nav { flex: 1; display: flex; flex-direction: column; gap: 4px; }
  .nav-item {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 18px; border-radius: 12px;
    color: var(--text-secondary); text-decoration: none;
    font-size: var(--text-sm); font-weight: 500;
    cursor: pointer; transition: var(--transition);
  }
  .nav-item i { width: 20px; text-align: center; font-size: 1rem; }
  .nav-item:hover { background: rgba(201,168,76,0.07); color: var(--gold); }
  .nav-item.active {
    background: rgba(201,168,76,0.1); color: var(--gold);
    border: 1px solid var(--gold-border);
  }

  .sidebar-bottom {
    padding-top: 28px; border-top: 1px solid var(--border);
    display: flex; align-items: center; gap: 10px;
  }
  .user-avatar {
    width: 40px; height: 40px; border-radius: 50%;
    background: linear-gradient(135deg, var(--gold-light), var(--gold-dark));
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 1rem; flex-shrink: 0; color: #000;
  }
  .user-name { font-size: var(--text-sm); font-weight: 700; color: var(--text-white); }
  .user-email { font-size: 0.78rem; color: var(--text-muted); }
  .user-info { flex: 1; display: flex; align-items: center; gap: 12px; min-width: 0; }
  .btn-icon {
    width: 36px; height: 36px; border-radius: 9px;
    background: rgba(255,255,255,0.04); border: 1px solid var(--border-subtle);
    color: var(--text-muted); cursor: pointer; display: flex;
    align-items: center; justify-content: center; transition: var(--transition); font-size: 0.9rem;
  }
  .logout:hover { background: rgba(239,68,68,0.1); color: #f87171; border-color: rgba(239,68,68,0.3); }

  /* Main */
  .main-content { margin-left: 280px; flex: 1; padding: 44px 40px; min-height: 100vh; }
  .loading-wrap { display: flex; align-items: center; justify-content: center; min-height: 60vh; }

  .page-header {
    display: flex; align-items: flex-start; justify-content: space-between;
    margin-bottom: 36px; flex-wrap: wrap; gap: 18px;
    padding-bottom: 28px; border-bottom: 1px solid var(--border);
  }
  .page-title {
    font-family: var(--font-display); font-size: 2.6rem; font-weight: 700;
    color: var(--text-white);
  }
  .page-sub { color: var(--text-secondary); font-size: var(--text-sm); margin-top: 6px; }
  .header-actions { display: flex; gap: 14px; }

  /* Stats */
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; margin-bottom: 28px; }
  .stat-card { display: flex; align-items: center; gap: 18px; padding: 24px 26px; }
  .stat-icon {
    width: 54px; height: 54px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem; color: #000; flex-shrink: 0;
  }
  .stat-value { font-size: 2rem; font-weight: 800; font-family: var(--font-display); color: var(--text-white); }
  .stat-label { font-size: var(--text-xs); color: var(--text-muted); margin-top: 2px; letter-spacing: 0.3px; }

  /* Row two */
  .row-two { display: grid; grid-template-columns: 1fr 1fr; gap: 26px; margin-bottom: 26px; }
  .card-title { font-size: var(--text-md); font-weight: 700; margin-bottom: 22px; color: var(--text-white); }

  /* Strength */
  .strength-circle-wrap { display: flex; justify-content: center; margin-bottom: 28px; }
  .strength-circle { position: relative; width: 150px; height: 150px; }
  .strength-circle svg { width: 100%; height: 100%; }
  .circle-val {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    font-size: 1.6rem; font-weight: 800;
    font-family: var(--font-display); color: var(--gold-light);
  }
  .strength-tips { display: flex; flex-direction: column; gap: 12px; }
  .tip { display: flex; align-items: center; gap: 12px; font-size: var(--text-sm); }
  .tip-done { color: #34d399; }
  .tip-todo { color: var(--text-muted); }
  .tip .done { color: var(--text-muted); text-decoration: line-through; }

  /* Share */
  .share-status {
    display: flex; align-items: center; gap: 10px;
    font-size: var(--text-sm); font-weight: 600;
    color: var(--text-muted); margin-bottom: 22px;
  }
  .share-status.published { color: #34d399; }
  .status-dot { width: 9px; height: 9px; border-radius: 50%; background: var(--text-muted); }
  .share-status.published .status-dot { background: #34d399; animation: pulse 2s infinite; }
  .share-link-wrap { display: flex; gap: 12px; margin-bottom: 22px; }
  .share-input {
    flex: 1; padding: 12px 16px;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border); border-radius: 10px;
    color: var(--text-secondary); font-size: var(--text-xs);
    font-family: var(--font-mono); outline: none;
  }
  .share-hint { color: var(--text-muted); font-size: var(--text-sm); margin-bottom: 22px; line-height: 1.7; }
  .share-actions { display: flex; gap: 12px; flex-wrap: wrap; }

  /* Sections */
  .sections-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .section-item {
    display: flex; align-items: center; gap: 14px;
    padding: 18px; background: rgba(255,255,255,0.025);
    border: 1px solid var(--border); border-radius: 12px; transition: var(--transition);
  }
  .section-item:hover { border-color: var(--gold-border); }
  .section-icon {
    width: 40px; height: 40px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.9rem; color: #000; flex-shrink: 0;
  }
  .section-info { flex: 1; }
  .section-name { display: block; font-size: var(--text-sm); font-weight: 700; color: var(--text-white); }
  .section-count { display: block; font-size: var(--text-xs); color: var(--text-muted); }
  .section-badge {
    font-size: 0.72rem; font-weight: 700; padding: 4px 12px;
    border-radius: 999px; background: rgba(255,255,255,0.05); color: var(--text-muted);
    letter-spacing: 0.5px; text-transform: uppercase;
  }
  .section-badge.complete { background: rgba(52,211,153,0.12); color: #34d399; }

  @media (max-width: 1200px) { .stats-grid { grid-template-columns: repeat(2,1fr); } }
  @media (max-width: 1024px) {
    .row-two { grid-template-columns: 1fr; }
    .sections-grid { grid-template-columns: repeat(2,1fr); }
  }
  @media (max-width: 768px) {
    .sidebar { display: none; }
    .main-content { margin-left: 0; padding: 22px; }
    .stats-grid { grid-template-columns: 1fr 1fr; }
  }
`]
})
export class DashboardComponent implements OnInit {
  portfolio: Portfolio | null = null;
  loading = true;
  userName = '';
  userEmail = '';
  userInitial = '';
  shareUrl = '';

  constructor(
    private portfolioService: PortfolioService,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = user.name;
      this.userEmail = user.email;
      this.userInitial = user.name.charAt(0).toUpperCase();
    }
    this.portfolioService.getMyPortfolio().subscribe({
      next: (p) => {
        this.portfolio = p;
        this.updateShareUrl();
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  updateShareUrl() {
    if (this.portfolio?.shareId) {
      this.shareUrl = `${window.location.origin}/portfolio/${this.portfolio.shareId}`;
    }
  }

  get suggestions() {
    const p = this.portfolio;
    if (!p) return [];
    return [
      { text: 'Add your name and title', done: !!(p.personal.fullName && p.personal.title) },
      { text: 'Write a compelling bio (50+ chars)', done: !!(p.personal.bio && p.personal.bio.length > 50) },
      { text: 'Add profile photo', done: !!p.personal.profileImage },
      { text: 'List at least 5 skills', done: p.skills.length >= 5 },
      { text: 'Add at least 2 projects', done: p.projects.length >= 2 },
      { text: 'Add education history', done: p.education.length > 0 },
      { text: 'Add social links', done: !!(p.social.github || p.social.linkedin) },
    ];
  }

  get sectionStatus() {
    const p = this.portfolio!;
    return [
      { name: 'Personal Info', icon: 'fas fa-user', color: 'linear-gradient(135deg,#00d4ff,#0099cc)', count: p.personal.fullName ? 1 : 0 },
      { name: 'Education', icon: 'fas fa-graduation-cap', color: 'linear-gradient(135deg,#7c3aed,#5b21b6)', count: p.education.length },
      { name: 'Skills', icon: 'fas fa-code', color: 'linear-gradient(135deg,#10b981,#059669)', count: p.skills.length },
      { name: 'Projects', icon: 'fas fa-folder', color: 'linear-gradient(135deg,#f59e0b,#d97706)', count: p.projects.length },
      { name: 'Experience', icon: 'fas fa-briefcase', color: 'linear-gradient(135deg,#ef4444,#dc2626)', count: p.experience.length },
      { name: 'Achievements', icon: 'fas fa-trophy', color: 'linear-gradient(135deg,#ec4899,#be185d)', count: p.achievements.length },
    ];
  }

  togglePublish() {
    this.portfolioService.togglePublish().subscribe({
      next: (res) => {
        if (this.portfolio) {
          this.portfolio.isPublished = res.isPublished;
          this.portfolio.shareId = res.shareId;
          this.updateShareUrl();
        }
        this.toastService.show(res.isPublished ? 'Portfolio published!' : 'Portfolio unpublished');
      },
      error: () => this.toastService.show('Failed to update publish status', 'error')
    });
  }

  copyLink() {
    navigator.clipboard.writeText(this.shareUrl);
    this.toastService.show('Link copied to clipboard!');
  }

  previewPortfolio() {
    if (this.portfolio?.shareId && this.portfolio.isPublished) {
      window.open(`/portfolio/${this.portfolio.shareId}`, '_blank');
    } else {
      this.toastService.show('Please publish your portfolio first', 'error');
    }
  }

  downloadPDF() {
    if (this.portfolio?.shareId) {
      window.open(`/portfolio/${this.portfolio.shareId}?pdf=true`, '_blank');
    }
  }

  logout() {
    this.authService.logout();
  }
}