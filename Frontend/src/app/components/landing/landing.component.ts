import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="landing bg-grid">

      <!-- Navbar -->
      <nav class="navbar glass">
        <div class="container nav-inner">
          <div class="nav-brand">
            <div class="brand-icon">
              <i class="fas fa-layer-group"></i>
            </div>
            <span class="brand-text">Build<span class="accent">My</span>Folio</span>
          </div>
          <div class="nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#themes">Themes</a>
          </div>
          <div class="nav-cta">
            <a routerLink="/auth/login" class="btn btn-ghost" *ngIf="!isLoggedIn">Login</a>
            <a routerLink="/auth/register" class="btn btn-primary" *ngIf="!isLoggedIn">Get Started Free</a>
            <a routerLink="/dashboard" class="btn btn-primary" *ngIf="isLoggedIn">Go to Dashboard</a>
          </div>
        </div>
      </nav>

      <!-- Hero -->
      <section class="hero">
        <div class="hero-bg">
          <div class="orb orb-1"></div>
          <div class="orb orb-2"></div>
          <div class="orb orb-3"></div>
        </div>
        <div class="container hero-content">
          <div class="hero-badge">
            <span class="badge badge-accent"><i class="fas fa-sparkles"></i> AI-Powered Portfolio Builder</span>
          </div>
          <h1 class="hero-title">
            Build Your Dream<br />
            <span class="gradient-text">Portfolio in Minutes</span>
          </h1>
          <p class="hero-desc">
            Stop wasting time coding your portfolio. BuildMyFolio turns your information
            into a stunning, professional portfolio — complete with live preview,
            shareable links, and PDF export.
          </p>
          <div class="hero-actions">
            <a routerLink="/auth/register" class="btn btn-primary btn-lg">
              <i class="fas fa-rocket"></i> Start Building Free
            </a>
            <a href="#how-it-works" class="btn btn-outline btn-lg">
              <i class="fas fa-play"></i> See How It Works
            </a>
          </div>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-value">10K+</span>
              <span class="stat-label">Portfolios Built</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-value">50+</span>
              <span class="stat-label">Universities</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-value">98%</span>
              <span class="stat-label">Satisfaction Rate</span>
            </div>
          </div>
        </div>
        <!-- Mock portfolio card -->
        <div class="hero-preview">
          <div class="preview-card glass">
            <div class="preview-header">
              <div class="preview-avatar"></div>
              <div class="preview-info">
                <div class="preview-name"></div>
                <div class="preview-title"></div>
              </div>
            </div>
            <div class="preview-tags">
              <span></span><span></span><span></span>
            </div>
            <div class="preview-strength">
              <div class="strength-label">Portfolio Strength</div>
              <div class="strength-bar">
                <div class="strength-fill" style="width: 82%"></div>
              </div>
              <span class="strength-val">82%</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="features" id="features">
        <div class="container">
          <div class="section-header">
            <span class="badge badge-purple">Features</span>
            <h2 class="section-title">Everything You Need</h2>
            <p class="section-subtitle">A complete toolkit to create, customize, and share your portfolio</p>
          </div>
          <div class="features-grid">
            <div class="feature-card card" *ngFor="let f of features">
              <div class="feature-icon" [style.background]="f.bg">
                <i [class]="f.icon"></i>
              </div>
              <h3>{{ f.title }}</h3>
              <p>{{ f.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works -->
      <section class="how-it-works" id="how-it-works">
        <div class="container">
          <div class="section-header">
            <span class="badge badge-accent">Process</span>
            <h2 class="section-title">How It Works</h2>
            <p class="section-subtitle">Three simple steps to your dream portfolio</p>
          </div>
          <div class="steps">
            <div class="step" *ngFor="let s of steps; let i = index">
              <div class="step-num">0{{ i + 1 }}</div>
              <div class="step-icon"><i [class]="s.icon"></i></div>
              <h3>{{ s.title }}</h3>
              <p>{{ s.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Themes -->
      <section class="themes-section" id="themes">
        <div class="container">
          <div class="section-header">
            <span class="badge badge-gold">Themes</span>
            <h2 class="section-title">Choose Your Style</h2>
            <p class="section-subtitle">Pick from handcrafted themes or customize your own colors</p>
          </div>
          <div class="themes-grid">
            <div class="theme-card" *ngFor="let t of themes" [style.--t-color]="t.color">
              <div class="theme-preview" [style.background]="t.bg">
                <div class="theme-dot" [style.background]="t.color"></div>
              </div>
              <span>{{ t.name }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta-section">
        <div class="container">
          <div class="cta-card card">
            <div class="cta-orb"></div>
            <h2>Ready to Stand Out?</h2>
            <p>Join thousands of students who landed their dream jobs with BuildMyFolio</p>
            <a routerLink="/auth/register" class="btn btn-primary btn-lg">
              <i class="fas fa-rocket"></i> Create Your Portfolio Free
            </a>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <div class="container footer-inner">
          <div class="brand-text">Build<span class="accent">My</span>Folio</div>
          <p>© 2024 BuildMyFolio. Empowering students worldwide.</p>
        </div>
      </footer>

    </div>
  `,
  styles: [`
  .landing { min-height: 100vh; }

  /* ── NAVBAR ── */
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 20px 0;
    border-bottom: 1px solid var(--border);
    border-top: none; border-left: none; border-right: none; border-radius: 0;
  }
  .nav-inner {
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-brand { display: flex; align-items: center; gap: 14px; text-decoration: none; }
  .brand-icon {
    width: 44px; height: 44px;
    background: linear-gradient(135deg, var(--gold-light), var(--gold-dark));
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem; color: #000;
    box-shadow: 0 4px 16px rgba(201,168,76,0.35);
  }
  .brand-text {
    font-family: var(--font-display);
    font-size: 1.6rem; font-weight: 700;
    color: var(--text-primary); letter-spacing: 0.5px;
  }
  .accent { color: var(--gold); }
  .nav-links { display: flex; gap: 40px; }
  .nav-links a {
    color: var(--text-secondary); text-decoration: none;
    font-size: var(--text-sm); font-weight: 500;
    transition: var(--transition); letter-spacing: 0.3px;
  }
  .nav-links a:hover { color: var(--gold); }
  .nav-cta { display: flex; gap: 14px; align-items: center; }

  /* ── HERO ── */
  .hero {
    min-height: 100vh; display: flex; align-items: center;
    padding: 130px 0 90px; position: relative; overflow: hidden;
  }
  .hero-bg { position: absolute; inset: 0; pointer-events: none; }
  .orb {
    position: absolute; border-radius: 50%;
    filter: blur(100px); opacity: 0.08; animation: float 8s ease-in-out infinite;
  }
  .orb-1 { width: 700px; height: 700px; background: var(--gold); top: -200px; right: -150px; }
  .orb-2 { width: 500px; height: 500px; background: var(--navy-light); bottom: -150px; left: -100px; animation-delay: -4s; }
  .orb-3 { width: 250px; height: 250px; background: var(--gold-light); top: 40%; left: 35%; opacity: 0.04; animation-delay: -2s; }

  .hero-content { position: relative; z-index: 1; max-width: 680px; }
  .hero-badge { margin-bottom: 28px; }
  .hero-badge .badge { font-size: 0.8rem; padding: 8px 20px; }

  .hero-title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 6vw, 5rem);
    font-weight: 700; line-height: 1.1; margin-bottom: 24px;
    color: var(--text-white);
  }
  .hero-title .gradient-text {
    background: linear-gradient(135deg, var(--gold-light), var(--gold), var(--gold-dark));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-desc {
    font-size: var(--text-md); color: var(--text-secondary);
    margin-bottom: 44px; max-width: 560px; line-height: 1.8;
  }
  .hero-actions { display: flex; gap: 18px; flex-wrap: wrap; margin-bottom: 56px; }
  .btn-lg { padding: 17px 38px; font-size: var(--text-sm); }

  .hero-stats { display: flex; align-items: center; gap: 28px; }
  .stat-value {
    display: block; font-size: 2rem; font-weight: 800;
    font-family: var(--font-display); color: var(--gold-light);
  }
  .stat-label { font-size: var(--text-xs); color: var(--text-muted); letter-spacing: 0.5px; }
  .stat-divider { width: 1px; height: 44px; background: var(--border); }

  /* Floating card */
  .hero-preview {
    position: absolute; right: 4%; top: 50%;
    transform: translateY(-50%);
    animation: float 5s ease-in-out infinite;
  }
  .preview-card { width: 300px; padding: 28px; border-radius: 22px; border: 1px solid var(--gold-border); }
  .preview-header { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
  .preview-avatar {
    width: 54px; height: 54px; border-radius: 50%;
    background: linear-gradient(135deg, var(--gold-light), var(--gold-dark));
    border: 2px solid var(--gold-border);
  }
  .preview-name { height: 13px; width: 130px; border-radius: 6px; background: rgba(255,255,255,0.14); margin-bottom: 9px; }
  .preview-title { height: 9px; width: 90px; border-radius: 4px; background: rgba(255,255,255,0.07); }
  .preview-tags { display: flex; gap: 8px; margin-bottom: 22px; }
  .preview-tags span {
    height: 28px; width: 68px; border-radius: 999px;
    background: rgba(201,168,76,0.1); border: 1px solid var(--gold-border);
  }
  .strength-label { font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 10px; }
  .strength-val {
    font-size: 0.85rem; color: var(--gold); font-weight: 700;
    margin-top: 8px; display: block; text-align: right;
    font-family: var(--font-mono);
  }

  /* ── FEATURES ── */
  section { padding: 110px 0; }
  .section-header { margin-bottom: 70px; }
  .section-header .section-title { font-size: 3rem; }

  .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px; }
  .feature-card { text-align: left; padding: 36px; }
  .feature-icon {
    width: 64px; height: 64px; border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.5rem; margin-bottom: 22px; color: #000;
  }
  .feature-card h3 {
    font-size: var(--text-md); font-weight: 700; margin-bottom: 12px;
    color: var(--text-white);
  }
  .feature-card p { color: var(--text-secondary); font-size: var(--text-sm); line-height: 1.75; }

  /* ── HOW IT WORKS ── */
  .how-it-works { background: rgba(255,255,255,0.015); }
  .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 36px; }
  .step {
    text-align: left; padding: 40px 32px;
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: var(--radius-xl); position: relative;
    transition: var(--transition);
  }
  .step:hover { border-color: var(--gold-border-hover); transform: translateY(-4px); box-shadow: var(--shadow-gold); }
  .step-num {
    font-family: var(--font-mono); font-size: 4rem; font-weight: 700;
    color: rgba(201,168,76,0.08); line-height: 1; margin-bottom: 20px;
    position: absolute; top: 20px; right: 24px;
  }
  .step-icon {
    width: 56px; height: 56px;
    background: linear-gradient(135deg, var(--gold-light), var(--gold-dark));
    border-radius: 14px; display: flex; align-items: center; justify-content: center;
    font-size: 1.3rem; color: #000; margin-bottom: 20px;
  }
  .step h3 { font-size: var(--text-md); font-weight: 700; margin-bottom: 10px; color: var(--text-white); }
  .step p { color: var(--text-secondary); font-size: var(--text-sm); line-height: 1.7; }

  /* ── THEMES ── */
  .themes-section {}
  .themes-grid { display: flex; gap: 24px; justify-content: center; flex-wrap: wrap; }
  .theme-card { text-align: center; cursor: pointer; transition: var(--transition); }
  .theme-card:hover { transform: translateY(-6px); }
  .theme-preview {
    width: 110px; height: 110px; border-radius: 20px;
    margin-bottom: 12px; display: flex; align-items: center; justify-content: center;
    border: 2px solid var(--border); transition: var(--transition);
  }
  .theme-card:hover .theme-preview { border-color: var(--gold); box-shadow: var(--shadow-gold); }
  .theme-dot { width: 36px; height: 36px; border-radius: 50%; }
  .theme-card span { font-size: var(--text-sm); color: var(--text-secondary); font-weight: 500; }

  /* ── CTA ── */
  .cta-section { padding: 90px 0; }
  .cta-card {
    text-align: center; padding: 90px 50px;
    position: relative; overflow: hidden;
    border: 1px solid var(--gold-border);
    background: linear-gradient(135deg, var(--bg-card), rgba(26,42,74,0.3));
  }
  .cta-orb {
    position: absolute; width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(201,168,76,0.06), transparent 70%);
    top: 50%; left: 50%; transform: translate(-50%,-50%);
    border-radius: 50%; pointer-events: none;
  }
  .cta-card h2 {
    font-family: var(--font-display);
    font-size: 3.2rem; margin-bottom: 16px; position: relative;
    color: var(--text-white);
  }
  .cta-card p {
    color: var(--text-secondary); margin-bottom: 38px;
    font-size: var(--text-md); position: relative;
  }
  .cta-card .btn { position: relative; }

  /* ── FOOTER ── */
  .footer { padding: 44px 0; border-top: 1px solid var(--border); }
  .footer-inner { display: flex; align-items: center; justify-content: space-between; }
  .footer-brand { font-family: var(--font-display); font-size: 1.4rem; font-weight: 700; }
  .footer p { color: var(--text-muted); font-size: var(--text-xs); }

  @media (max-width: 1024px) {
    .features-grid { grid-template-columns: repeat(2, 1fr); }
    .steps { grid-template-columns: 1fr; }
  }
  @media (max-width: 900px) {
    .hero-preview { display: none; }
    .nav-links { display: none; }
    .footer-inner { flex-direction: column; gap: 14px; text-align: center; }
  }
  @media (max-width: 640px) {
    .features-grid { grid-template-columns: 1fr; }
    .hero-title { font-size: 2.6rem; }
  }
`]
})
export class LandingComponent {
  isLoggedIn = false;

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  features = [
    { icon: 'fas fa-magic', title: 'Guided Builder', desc: 'Step-by-step form that collects your info and generates a full portfolio automatically.', bg: 'linear-gradient(135deg,#00d4ff,#0099cc)' },
    { icon: 'fas fa-chart-line', title: 'Portfolio Strength Score', desc: 'Real-time scoring with personalized tips to make your portfolio recruiter-ready.', bg: 'linear-gradient(135deg,#7c3aed,#5b21b6)' },
    { icon: 'fas fa-palette', title: 'Theme Customization', desc: 'Choose from 6 handcrafted professional themes or create your own color scheme.', bg: 'linear-gradient(135deg,#f59e0b,#d97706)' },
    { icon: 'fas fa-share-nodes', title: 'Shareable Link', desc: 'One-click publish to get a unique URL you can share on LinkedIn, resume, or email.', bg: 'linear-gradient(135deg,#10b981,#059669)' },
    { icon: 'fas fa-file-pdf', title: 'PDF Export', desc: 'Download your portfolio as a high-quality PDF perfect for job applications.', bg: 'linear-gradient(135deg,#ef4444,#dc2626)' },
    { icon: 'fas fa-eye', title: 'Live Preview', desc: 'See changes in real-time as you edit — no surprises when you publish.', bg: 'linear-gradient(135deg,#ec4899,#be185d)' },
  ];

  steps = [
    { icon: 'fas fa-user-pen', title: 'Fill Your Info', desc: 'Enter your personal details, education, skills, and projects through our guided form.' },
    { icon: 'fas fa-wand-magic-sparkles', title: 'We Generate It', desc: 'Our engine instantly builds a professional, organized portfolio from your data.' },
    { icon: 'fas fa-share', title: 'Share & Download', desc: 'Publish with a link, share on social media, or download as PDF instantly.' },
  ];

  themes = [
    { name: 'Midnight', color: '#00d4ff', bg: '#050810' },
    { name: 'Aurora', color: '#7c3aed', bg: '#0d0520' },
    { name: 'Ember', color: '#f59e0b', bg: '#1a0a00' },
    { name: 'Forest', color: '#10b981', bg: '#001a0d' },
    { name: 'Rose', color: '#ec4899', bg: '#1a0010' },
    { name: 'Slate', color: '#94a3b8', bg: '#0f172a' },
  ];
}