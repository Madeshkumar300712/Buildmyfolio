import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';
import { ToastService } from '../../services/toast.service';
import { Portfolio, Skill, Project, Education, Experience, Achievement } from '../../models/portfolio.model';

@Component({
  selector: 'app-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="builder bg-grid">
      <!-- Top bar -->
      <header class="builder-header glass">
        <div class="header-left">
          <a routerLink="/dashboard" class="back-btn">
            <i class="fas fa-arrow-left"></i>
          </a>
          <div class="brand-icon"><i class="fas fa-layer-group"></i></div>
          <span class="brand-name">Portfolio Builder</span>
        </div>
        <div class="step-indicators">
          <div class="step-pill" *ngFor="let s of steps; let i = index"
            [class.active]="currentStep === i"
            [class.done]="currentStep > i"
            (click)="goToStep(i)">
            <i [class]="currentStep > i ? 'fas fa-check' : s.icon"></i>
            <span>{{ s.label }}</span>
          </div>
        </div>
        <div class="header-right">
          <div class="strength-mini">
            <span>Strength: </span>
            <span class="strength-val">{{ portfolio?.strength || 0 }}%</span>
          </div>
          <button class="btn btn-primary" (click)="saveAll()" [disabled]="saving">
            <span class="spinner-sm" *ngIf="saving"></span>
            <i class="fas fa-save" *ngIf="!saving"></i>
            {{ saving ? 'Saving...' : 'Save' }}
          </button>
        </div>
      </header>

      <div class="builder-body">
        <!-- Progress bar -->
        <div class="progress-bar">
          <div class="progress-fill" [style.width]="((currentStep + 1) / steps.length * 100) + '%'"></div>
        </div>

        <!-- Content area -->
        <div class="builder-content" *ngIf="portfolio">

          <!-- Step 0: Personal -->
          <div class="step-panel" *ngIf="currentStep === 0">
            <div class="step-header">
              <i class="fas fa-user step-icon-big"></i>
              <div>
                <h2>Personal Information</h2>
                <p>Tell us about yourself. This appears in your portfolio header.</p>
              </div>
            </div>
            <div class="form-grid-2">
              <div class="form-group">
                <label>Full Name *</label>
                <input type="text" placeholder="John Doe" [(ngModel)]="portfolio.personal.fullName" />
              </div>
              <div class="form-group">
                <label>Professional Title *</label>
                <input type="text" placeholder="Full Stack Developer" [(ngModel)]="portfolio.personal.title" />
              </div>
              <div class="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="john@email.com" [(ngModel)]="portfolio.personal.email" />
              </div>
              <div class="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="+1 234 567 890" [(ngModel)]="portfolio.personal.phone" />
              </div>
              <div class="form-group">
                <label>Location</label>
                <input type="text" placeholder="New York, USA" [(ngModel)]="portfolio.personal.location" />
              </div>
              <div class="form-group">
                <label>Website / Portfolio URL</label>
                <input type="url" placeholder="https://yoursite.com" [(ngModel)]="portfolio.personal.website" />
              </div>
              <div class="form-group span-2">
                <label>Professional Bio *</label>
                <textarea rows="4" placeholder="Write a compelling bio that highlights your skills, experience, and goals..."
                  [(ngModel)]="portfolio.personal.bio"></textarea>
                <div class="char-count" [class.warn]="portfolio.personal.bio.length < 50">
                  {{ portfolio.personal.bio.length }} chars {{ portfolio.personal.bio.length < 50 ? '(min 50 recommended)' : '✓' }}
                </div>
              </div>
              <div class="form-group span-2">
                <label>Profile Image URL</label>
                <input type="url" placeholder="https://..." [(ngModel)]="portfolio.personal.profileImage" />
              </div>
            </div>

            <!-- Social links -->
            <div class="sub-section">
              <h3>Social Links</h3>
              <div class="form-grid-2">
                <div class="form-group">
                  <label><i class="fab fa-github"></i> GitHub</label>
                  <input type="url" placeholder="https://github.com/username" [(ngModel)]="portfolio.social.github" />
                </div>
                <div class="form-group">
                  <label><i class="fab fa-linkedin"></i> LinkedIn</label>
                  <input type="url" placeholder="https://linkedin.com/in/username" [(ngModel)]="portfolio.social.linkedin" />
                </div>
                <div class="form-group">
                  <label><i class="fab fa-twitter"></i> Twitter</label>
                  <input type="url" placeholder="https://twitter.com/username" [(ngModel)]="portfolio.social.twitter" />
                </div>
                <div class="form-group">
                  <label><i class="fab fa-instagram"></i> Instagram</label>
                  <input type="url" placeholder="https://instagram.com/username" [(ngModel)]="portfolio.social.instagram" />
                </div>
              </div>
            </div>
          </div>

          <!-- Step 1: Education -->
          <div class="step-panel" *ngIf="currentStep === 1">
            <div class="step-header">
              <i class="fas fa-graduation-cap step-icon-big"></i>
              <div>
                <h2>Education</h2>
                <p>Add your educational background. Degrees, certifications, courses.</p>
              </div>
            </div>
            <div class="items-list">
              <div class="item-card card" *ngFor="let edu of portfolio.education; let i = index">
                <div class="item-header">
                  <div class="item-title">
                    <strong>{{ edu.institution || 'New Education' }}</strong>
                    <span>{{ edu.degree }} {{ edu.field ? '- ' + edu.field : '' }}</span>
                  </div>
                  <button class="btn-icon-sm delete" (click)="removeItem('education', i)">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
                <div class="form-grid-2">
                  <div class="form-group">
                    <label>Institution *</label>
                    <input type="text" placeholder="MIT" [(ngModel)]="edu.institution" />
                  </div>
                  <div class="form-group">
                    <label>Degree</label>
                    <input type="text" placeholder="B.Tech / B.Sc / MBA" [(ngModel)]="edu.degree" />
                  </div>
                  <div class="form-group">
                    <label>Field of Study</label>
                    <input type="text" placeholder="Computer Science" [(ngModel)]="edu.field" />
                  </div>
                  <div class="form-group">
                    <label>Grade / CGPA</label>
                    <input type="text" placeholder="9.2 / 10" [(ngModel)]="edu.grade" />
                  </div>
                  <div class="form-group">
                    <label>Start Year</label>
                    <input type="text" placeholder="2020" [(ngModel)]="edu.startYear" />
                  </div>
                  <div class="form-group">
                    <label>End Year</label>
                    <input type="text" placeholder="2024" [(ngModel)]="edu.endYear" />
                  </div>
                  <div class="form-group span-2">
                    <label>Description</label>
                    <textarea placeholder="Key subjects, thesis, activities..." [(ngModel)]="edu.description"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <button class="btn btn-outline add-btn" (click)="addItem('education')">
              <i class="fas fa-plus"></i> Add Education
            </button>
          </div>

          <!-- Step 2: Skills -->
          <div class="step-panel" *ngIf="currentStep === 2">
            <div class="step-header">
              <i class="fas fa-code step-icon-big"></i>
              <div>
                <h2>Skills</h2>
                <p>Add your technical and soft skills with proficiency levels.</p>
              </div>
            </div>
            <div class="skills-grid">
              <div class="skill-card card" *ngFor="let skill of portfolio.skills; let i = index">
                <div class="skill-header">
                  <input type="text" class="skill-name-input" placeholder="e.g. React" [(ngModel)]="skill.name" />
                  <button class="btn-icon-sm delete" (click)="removeItem('skills', i)">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                <div class="form-group">
                  <label>Category</label>
                  <select [(ngModel)]="skill.category">
                    <option>Frontend</option>
                    <option>Backend</option>
                    <option>Database</option>
                    <option>DevOps</option>
                    <option>Mobile</option>
                    <option>Design</option>
                    <option>Other</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Proficiency: {{ skill.level }}%</label>
                  <input type="range" min="0" max="100" [(ngModel)]="skill.level" class="range-input" />
                  <div class="skill-bar">
                    <div class="skill-fill" [style.width]="skill.level + '%'"></div>
                  </div>
                </div>
              </div>
            </div>
            <button class="btn btn-outline add-btn" (click)="addItem('skills')">
              <i class="fas fa-plus"></i> Add Skill
            </button>
          </div>

          <!-- Step 3: Projects -->
          <div class="step-panel" *ngIf="currentStep === 3">
            <div class="step-header">
              <i class="fas fa-folder-open step-icon-big"></i>
              <div>
                <h2>Projects</h2>
                <p>Showcase your best work. Add at least 2-3 projects.</p>
              </div>
            </div>
            <div class="items-list">
              <div class="item-card card" *ngFor="let proj of portfolio.projects; let i = index">
                <div class="item-header">
                  <div class="item-title">
                    <strong>{{ proj.title || 'New Project' }}</strong>
                    <span>{{ proj.techStack?.join(', ') }}</span>
                  </div>
                  <div class="item-actions">
                    <label class="featured-toggle">
                      <input type="checkbox" [(ngModel)]="proj.featured" />
                      <span>Featured</span>
                    </label>
                    <button class="btn-icon-sm delete" (click)="removeItem('projects', i)">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
                <div class="form-grid-2">
                  <div class="form-group">
                    <label>Project Title *</label>
                    <input type="text" placeholder="Awesome App" [(ngModel)]="proj.title" />
                  </div>
                  <div class="form-group">
                    <label>Tech Stack (comma-separated)</label>
                    <input type="text" placeholder="React, Node, MongoDB" 
                      [ngModel]="proj.techStack?.join(', ')"
                      (ngModelChange)="updateTechStack($event, proj)" />
                  </div>
                  <div class="form-group">
                    <label>Live URL</label>
                    <input type="url" placeholder="https://myapp.com" [(ngModel)]="proj.liveUrl" />
                  </div>
                  <div class="form-group">
                    <label>GitHub URL</label>
                    <input type="url" placeholder="https://github.com/..." [(ngModel)]="proj.githubUrl" />
                  </div>
                  <div class="form-group">
                    <label>Image URL</label>
                    <input type="url" placeholder="https://..." [(ngModel)]="proj.image" />
                  </div>
                  <div class="form-group span-2">
                    <label>Description *</label>
                    <textarea rows="3" placeholder="What does this project do? What problem does it solve?" [(ngModel)]="proj.description"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <button class="btn btn-outline add-btn" (click)="addItem('projects')">
              <i class="fas fa-plus"></i> Add Project
            </button>
          </div>

          <!-- Step 4: Experience -->
          <div class="step-panel" *ngIf="currentStep === 4">
            <div class="step-header">
              <i class="fas fa-briefcase step-icon-big"></i>
              <div>
                <h2>Work Experience</h2>
                <p>Add internships, jobs, freelance work — any professional experience.</p>
              </div>
            </div>
            <div class="items-list">
              <div class="item-card card" *ngFor="let exp of portfolio.experience; let i = index">
                <div class="item-header">
                  <div class="item-title">
                    <strong>{{ exp.company || 'New Experience' }}</strong>
                    <span>{{ exp.role }}</span>
                  </div>
                  <button class="btn-icon-sm delete" (click)="removeItem('experience', i)">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
                <div class="form-grid-2">
                  <div class="form-group">
                    <label>Company / Organization *</label>
                    <input type="text" placeholder="Google Inc." [(ngModel)]="exp.company" />
                  </div>
                  <div class="form-group">
                    <label>Role / Position *</label>
                    <input type="text" placeholder="Software Intern" [(ngModel)]="exp.role" />
                  </div>
                  <div class="form-group">
                    <label>Start Date</label>
                    <input type="text" placeholder="Jan 2023" [(ngModel)]="exp.startDate" />
                  </div>
                  <div class="form-group">
                    <label>End Date</label>
                    <input type="text" placeholder="Jun 2023" [(ngModel)]="exp.endDate" [disabled]="exp.current" />
                  </div>
                  <div class="form-group">
                    <label>Location</label>
                    <input type="text" placeholder="Remote / New York" [(ngModel)]="exp.location" />
                  </div>
                  <div class="form-group current-check">
                    <label class="checkbox-label">
                      <input type="checkbox" [(ngModel)]="exp.current" />
                      Currently working here
                    </label>
                  </div>
                  <div class="form-group span-2">
                    <label>Description</label>
                    <textarea rows="3" placeholder="Key responsibilities, achievements, impact..." [(ngModel)]="exp.description"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <button class="btn btn-outline add-btn" (click)="addItem('experience')">
              <i class="fas fa-plus"></i> Add Experience
            </button>
          </div>

          <!-- Step 5: Achievements -->
          <div class="step-panel" *ngIf="currentStep === 5">
            <div class="step-header">
              <i class="fas fa-trophy step-icon-big"></i>
              <div>
                <h2>Achievements & Certifications</h2>
                <p>Awards, certifications, hackathon wins — anything you're proud of.</p>
              </div>
            </div>
            <div class="items-list">
              <div class="item-card card" *ngFor="let ach of portfolio.achievements; let i = index">
                <div class="item-header">
                  <div class="item-title">
                    <strong>{{ ach.title || 'New Achievement' }}</strong>
                    <span>{{ ach.issuer }}</span>
                  </div>
                  <button class="btn-icon-sm delete" (click)="removeItem('achievements', i)">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
                <div class="form-grid-2">
                  <div class="form-group">
                    <label>Title *</label>
                    <input type="text" placeholder="Google Cloud Certified" [(ngModel)]="ach.title" />
                  </div>
                  <div class="form-group">
                    <label>Issuer / Organization</label>
                    <input type="text" placeholder="Google, Coursera, etc." [(ngModel)]="ach.issuer" />
                  </div>
                  <div class="form-group">
                    <label>Date</label>
                    <input type="text" placeholder="March 2024" [(ngModel)]="ach.date" />
                  </div>
                  <div class="form-group">
                    <label>URL / Link</label>
                    <input type="url" placeholder="https://cert.link" [(ngModel)]="ach.url" />
                  </div>
                  <div class="form-group span-2">
                    <label>Description</label>
                    <textarea rows="2" placeholder="What was this for?" [(ngModel)]="ach.description"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <button class="btn btn-outline add-btn" (click)="addItem('achievements')">
              <i class="fas fa-plus"></i> Add Achievement
            </button>
          </div>

          <!-- Step 6: Theme -->
          <div class="step-panel" *ngIf="currentStep === 6">
            <div class="step-header">
              <i class="fas fa-palette step-icon-big"></i>
              <div>
                <h2>Customize Theme</h2>
                <p>Choose a theme and color scheme for your portfolio.</p>
              </div>
            </div>
            <div class="themes-picker">
              <div class="theme-option" *ngFor="let t of availableThemes"
                [class.selected]="portfolio.theme.name === t.name"
                (click)="selectTheme(t)">
                <div class="theme-swatch" [style.background]="t.bg">
                  <div class="theme-accent-dot" [style.background]="t.color"></div>
                </div>
                <span>{{ t.name }}</span>
                <i class="fas fa-check theme-check" *ngIf="portfolio.theme.name === t.name"></i>
              </div>
            </div>
            <div class="custom-color sub-section">
              <h3>Custom Accent Color</h3>
              <div class="color-picker-wrap">
                <input type="color" [(ngModel)]="portfolio.theme.primaryColor" class="color-input" />
                <span>{{ portfolio.theme.primaryColor }}</span>
              </div>
            </div>
            <div class="font-picker sub-section">
              <h3>Font Family</h3>
              <div class="font-options">
                <div class="font-option" *ngFor="let f of fonts"
                  [class.selected]="portfolio.theme.fontFamily === f"
                  (click)="portfolio.theme.fontFamily = f"
                  [style.font-family]="f">
                  {{ f }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="builder-nav">
          <button class="btn btn-ghost" (click)="prevStep()" [disabled]="currentStep === 0">
            <i class="fas fa-arrow-left"></i> Previous
          </button>
          <div class="step-text">Step {{ currentStep + 1 }} of {{ steps.length }}</div>
          <button class="btn btn-primary" (click)="nextOrFinish()">
            {{ currentStep === steps.length - 1 ? 'Save & Finish' : 'Next' }}
            <i [class]="currentStep === steps.length - 1 ? 'fas fa-check' : 'fas fa-arrow-right'"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
  .builder { min-height: 100vh; display: flex; flex-direction: column; background: var(--bg-primary); }

  .builder-header {
    position: sticky; top: 0; z-index: 100; padding: 16px 28px;
    display: flex; align-items: center; justify-content: space-between;
    border-top: none; border-left: none; border-right: none; border-radius: 0;
    background: rgba(10,10,10,0.92);
    border-bottom: 1px solid var(--border);
  }
  .header-left { display: flex; align-items: center; gap: 14px; }
  .back-btn {
    width: 40px; height: 40px; border-radius: 10px;
    background: rgba(255,255,255,0.04); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    color: var(--text-secondary); cursor: pointer; text-decoration: none;
    transition: var(--transition); font-size: 0.95rem;
  }
  .back-btn:hover { color: var(--gold); border-color: var(--gold-border); }
  .brand-icon {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, var(--gold-light), var(--gold-dark));
    border-radius: 10px; display: flex; align-items: center; justify-content: center;
    font-size: 0.9rem; color: #000;
  }
  .brand-name { font-family: var(--font-display); font-size: 1.2rem; font-weight: 700; color: var(--text-white); }

  .step-indicators { display: flex; gap: 6px; }
  .step-pill {
    display: flex; align-items: center; gap: 7px;
    padding: 7px 16px; border-radius: 999px;
    font-size: 0.8rem; font-weight: 600;
    color: var(--text-muted); background: rgba(255,255,255,0.03);
    border: 1px solid var(--border-subtle); cursor: pointer; transition: var(--transition);
  }
  .step-pill.active {
    background: rgba(201,168,76,0.1); color: var(--gold);
    border-color: var(--gold-border);
  }
  .step-pill.done {
    background: rgba(52,211,153,0.08); color: #34d399;
    border-color: rgba(52,211,153,0.25);
  }

  .header-right { display: flex; align-items: center; gap: 18px; }
  .strength-mini { font-size: var(--text-sm); color: var(--text-secondary); }
  .strength-mini .strength-val { color: var(--gold-light); font-weight: 800; font-family: var(--font-mono); }
  .spinner-sm {
    width: 16px; height: 16px;
    border: 2px solid rgba(0,0,0,0.2); border-top-color: #000;
    border-radius: 50%; animation: spin 0.6s linear infinite;
  }

  .builder-body { flex: 1; display: flex; flex-direction: column; }
  .progress-bar { height: 3px; background: rgba(255,255,255,0.04); }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--gold-dark), var(--gold-light));
    transition: width 0.6s cubic-bezier(0.4,0,0.2,1);
  }

  .builder-content { flex: 1; padding: 48px 40px; max-width: 960px; margin: 0 auto; width: 100%; }
  .step-panel { animation: fadeInUp 0.4s ease; }

  .step-header {
    display: flex; align-items: flex-start; gap: 22px;
    margin-bottom: 40px; padding-bottom: 28px; border-bottom: 1px solid var(--border);
  }
  .step-icon-big {
    font-size: 2.2rem;
    background: linear-gradient(135deg, var(--gold-light), var(--gold-dark));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; margin-top: 4px;
  }
  .step-header h2 { font-family: var(--font-display); font-size: 2rem; margin-bottom: 8px; color: var(--text-white); }
  .step-header p { color: var(--text-secondary); font-size: var(--text-sm); }

  .form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 24px; }
  .span-2 { grid-column: span 2; }
  .char-count { font-size: var(--text-xs); color: var(--text-muted); margin-top: 6px; font-family: var(--font-mono); }
  .char-count.warn { color: var(--gold); }

  .sub-section { margin-top: 36px; padding-top: 28px; border-top: 1px solid var(--border); }
  .sub-section h3 { font-size: var(--text-md); font-weight: 700; margin-bottom: 22px; color: var(--gold); }

  .items-list { display: flex; flex-direction: column; gap: 18px; }
  .item-card { padding: 28px; }
  .item-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; }
  .item-title strong { display: block; font-size: var(--text-sm); font-weight: 700; color: var(--text-white); }
  .item-title span { font-size: var(--text-xs); color: var(--text-secondary); margin-top: 3px; display: block; }
  .item-actions { display: flex; align-items: center; gap: 14px; }
  .btn-icon-sm {
    width: 34px; height: 34px; border-radius: 8px;
    background: none; border: 1px solid var(--border-subtle);
    color: var(--text-muted); cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.85rem; transition: var(--transition);
  }
  .btn-icon-sm.delete:hover { background: rgba(239,68,68,0.1); color: #f87171; border-color: rgba(239,68,68,0.25); }
  .featured-toggle { display: flex; align-items: center; gap: 8px; font-size: var(--text-xs); color: var(--text-secondary); cursor: pointer; }
  .featured-toggle input { accent-color: var(--gold); }
  .add-btn { margin-top: 18px; width: 100%; justify-content: center; border-style: dashed; }

  /* Skills */
  .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
  .skill-card { padding: 22px; }
  .skill-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
  .skill-name-input {
    flex: 1; background: none; border: none; color: var(--text-white);
    font-family: var(--font-body); font-size: var(--text-sm); font-weight: 700; outline: none; padding: 0;
  }
  .range-input {
    width: 100%; appearance: none; height: 4px; border-radius: 2px;
    background: rgba(255,255,255,0.08); outline: none; margin-bottom: 10px;
    accent-color: var(--gold);
  }
  .skill-bar { height: 5px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden; }
  .skill-fill {
    height: 100%; border-radius: 3px;
    background: linear-gradient(90deg, var(--gold-dark), var(--gold-light));
    transition: width 0.3s ease;
  }

  .checkbox-label { display: flex; align-items: center; gap: 10px; font-size: var(--text-sm); color: var(--text-secondary); cursor: pointer; margin-top: 24px; }
  .checkbox-label input { accent-color: var(--gold); width: 16px; height: 16px; }
  .current-check { display: flex; align-items: flex-end; }

  /* Themes */
  .themes-picker { display: flex; gap: 22px; flex-wrap: wrap; margin-bottom: 10px; }
  .theme-option {
    text-align: center; cursor: pointer; padding: 10px;
    border-radius: 14px; border: 2px solid transparent; transition: var(--transition);
    position: relative;
  }
  .theme-option.selected { border-color: var(--gold); box-shadow: var(--shadow-gold); }
  .theme-swatch {
    width: 100px; height: 100px; border-radius: 14px;
    margin-bottom: 10px; display: flex; align-items: center; justify-content: center;
    border: 1px solid var(--border);
  }
  .theme-accent-dot { width: 32px; height: 32px; border-radius: 50%; }
  .theme-option span { font-size: var(--text-xs); color: var(--text-secondary); font-weight: 600; text-transform: capitalize; }
  .theme-check { position: absolute; top: 6px; right: 6px; color: var(--gold); font-size: 0.8rem; }

  .color-picker-wrap { display: flex; align-items: center; gap: 18px; }
  .color-input {
    width: 64px; height: 44px; border-radius: 10px;
    border: 1px solid var(--border); cursor: pointer; background: none; padding: 4px;
  }
  .color-picker-wrap span { font-size: var(--text-sm); color: var(--text-secondary); font-family: var(--font-mono); }

  .font-options { display: flex; gap: 14px; flex-wrap: wrap; }
  .font-option {
    padding: 14px 22px; background: var(--bg-card);
    border: 1.5px solid var(--border); border-radius: 10px;
    cursor: pointer; transition: var(--transition); font-size: var(--text-sm);
    color: var(--text-secondary);
  }
  .font-option.selected { border-color: var(--gold); color: var(--gold); background: rgba(201,168,76,0.05); }
  .font-option:hover { border-color: var(--gold-border); }

  /* Nav */
  .builder-nav {
    position: sticky; bottom: 0;
    background: rgba(10,10,10,0.96);
    border-top: 1px solid var(--border);
    padding: 18px 40px;
    display: flex; align-items: center; justify-content: space-between;
    backdrop-filter: blur(20px);
  }
  .step-text { font-size: var(--text-sm); color: var(--text-muted); font-family: var(--font-mono); }

  @media (max-width: 768px) {
    .step-indicators { display: none; }
    .builder-content { padding: 24px 18px; }
    .form-grid-2 { grid-template-columns: 1fr; }
    .span-2 { grid-column: span 1; }
    .skills-grid { grid-template-columns: 1fr 1fr; }
    .builder-nav { padding: 16px 20px; }
  }
`]
})
export class BuilderComponent implements OnInit {
  portfolio: Portfolio | null = null;
  currentStep = 0;
  saving = false;

  steps = [
    { label: 'Personal', icon: 'fas fa-user' },
    { label: 'Education', icon: 'fas fa-graduation-cap' },
    { label: 'Skills', icon: 'fas fa-code' },
    { label: 'Projects', icon: 'fas fa-folder' },
    { label: 'Experience', icon: 'fas fa-briefcase' },
    { label: 'Achievements', icon: 'fas fa-trophy' },
    { label: 'Theme', icon: 'fas fa-palette' },
  ];

  availableThemes = [
    { name: 'midnight', color: '#00d4ff', bg: '#050810' },
    { name: 'aurora', color: '#7c3aed', bg: '#0d0520' },
    { name: 'ember', color: '#f59e0b', bg: '#1a0a00' },
    { name: 'forest', color: '#10b981', bg: '#001a0d' },
    { name: 'rose', color: '#ec4899', bg: '#1a0010' },
    { name: 'slate', color: '#94a3b8', bg: '#0f172a' },
  ];

  fonts = ['Outfit', 'Poppins', 'Raleway', 'DM Sans', 'Nunito'];

  constructor(
    private portfolioService: PortfolioService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.portfolioService.getMyPortfolio().subscribe({
      next: (p) => this.portfolio = p,
      error: () => this.toastService.show('Failed to load portfolio', 'error')
    });
  }

  goToStep(i: number) { this.currentStep = i; }
  prevStep() { if (this.currentStep > 0) this.currentStep--; }

  nextOrFinish() {
    if (this.currentStep === this.steps.length - 1) {
      this.saveAll(true);
    } else {
      this.currentStep++;
    }
  }

  saveAll(navigate = false) {
    if (!this.portfolio) return;
    this.saving = true;
    this.portfolioService.updatePortfolio(this.portfolio).subscribe({
      next: (p) => {
        this.portfolio = p;
        this.saving = false;
        this.toastService.show('Portfolio saved!');
        if (navigate) this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.saving = false;
        this.toastService.show('Save failed', 'error');
      }
    });
  }

  addItem(section: string) {
    if (!this.portfolio) return;
    const defaults: any = {
      education: { institution: '', degree: '', field: '', startYear: '', endYear: '', grade: '', description: '' },
      skills: { name: '', level: 50, category: 'Frontend' },
      projects: { title: '', description: '', techStack: [], liveUrl: '', githubUrl: '', image: '', featured: false },
      experience: { company: '', role: '', startDate: '', endDate: '', current: false, description: '', location: '' },
      achievements: { title: '', issuer: '', date: '', description: '', url: '' },
    };
    (this.portfolio as any)[section].push({ ...defaults[section] });
  }

  removeItem(section: string, index: number) {
    if (!this.portfolio) return;
    (this.portfolio as any)[section].splice(index, 1);
  }

  selectTheme(t: any) {
    if (!this.portfolio) return;
    this.portfolio.theme.name = t.name;
    this.portfolio.theme.primaryColor = t.color;
  }

  updateTechStack(value: string, proj: any) {
  proj.techStack = value.split(',').map(s => s.trim());
  }
}

