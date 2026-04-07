import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-portfolio-view',
  standalone: true,
  imports: [CommonModule],
templateUrl: './portfolio-view.component.html',
styleUrls: ['./portfolio-view.component.css'],
styles: [`
  .portfolio-view { --p-accent: #c9a84c; min-height: 100vh; background: var(--bg-primary); }

  .pf-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 18px 0;
    border-top: none; border-left: none; border-right: none; border-radius: 0;
    background: rgba(10,10,10,0.92); border-bottom: 1px solid var(--border);
  }
  .pf-nav-inner {
    max-width: 1180px; margin: 0 auto; padding: 0 32px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .pf-nav-name { font-family: var(--font-display); font-weight: 700; font-size: var(--text-md); color: var(--text-white); }
  .pf-nav-links { display: flex; gap: 32px; }
  .pf-nav-links a {
    color: var(--text-secondary); text-decoration: none;
    font-size: var(--text-sm); font-weight: 500; transition: var(--transition);
  }
  .pf-nav-links a:hover { color: var(--gold); }
  .btn-sm { padding: 9px 20px; font-size: var(--text-xs); }

  .pf-container { max-width: 1180px; margin: 0 auto; padding: 0 32px; }

  /* Hero */
  .pf-hero {
    min-height: 100vh; display: flex; align-items: center;
    padding: 110px 0 70px; position: relative; overflow: hidden;
  }
  .pf-hero-bg { position: absolute; inset: 0; pointer-events: none; }
  .pf-orb { position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.07; }
  .pf-orb-1 { width: 700px; height: 700px; background: var(--gold); top: -200px; right: -200px; }
  .pf-orb-2 { width: 500px; height: 500px; background: var(--navy-light); bottom: -150px; left: -100px; }

  .pf-hero-content { display: flex; align-items: center; gap: 70px; position: relative; z-index: 1; }
  .pf-avatar-wrap { flex-shrink: 0; }
  .pf-avatar {
    width: 220px; height: 220px; border-radius: 50%; object-fit: cover;
    border: 4px solid var(--gold); box-shadow: 0 0 50px rgba(201,168,76,0.3);
  }
  .pf-avatar-placeholder {
    width: 220px; height: 220px; border-radius: 50%;
    background: linear-gradient(135deg, var(--gold-light), var(--gold-dark));
    display: flex; align-items: center; justify-content: center;
    font-size: 5rem; font-weight: 800; color: #000;
    font-family: var(--font-display); border: 3px solid var(--gold-border);
  }

  .pf-greeting { font-size: var(--text-sm); color: var(--gold); font-weight: 600; margin-bottom: 10px; letter-spacing: 2px; text-transform: uppercase; font-family: var(--font-mono); }
  .pf-name { font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 700; margin-bottom: 10px; color: var(--text-white); line-height: 1.15; }
  .pf-title { font-size: var(--text-md); color: var(--gold-light); font-weight: 600; margin-bottom: 18px; }
  .pf-bio { color: var(--text-secondary); line-height: 1.85; font-size: var(--text-sm); max-width: 540px; margin-bottom: 20px; }

  .pf-meta { display: flex; gap: 24px; margin-bottom: 24px; flex-wrap: wrap; }
  .pf-meta span { color: var(--text-secondary); font-size: var(--text-sm); display: flex; align-items: center; gap: 8px; }
  .pf-meta i { color: var(--gold); }

  .pf-socials { display: flex; gap: 12px; }
  .social-btn {
    width: 42px; height: 42px; border-radius: 11px;
    background: rgba(255,255,255,0.04); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    color: var(--text-secondary); text-decoration: none;
    transition: var(--transition); font-size: 1rem;
  }
  .social-btn:hover { background: rgba(201,168,76,0.1); color: var(--gold); border-color: var(--gold-border); }

  /* Sections */
  .pf-section { padding: 90px 0; }
  .pf-section-alt { background: rgba(255,255,255,0.018); }
  .pf-section-title { display: flex; align-items: center; gap: 14px; margin-bottom: 52px; }
  .pf-section-title i { font-size: 1.3rem; color: var(--gold); }
  .pf-section-title h2 { font-family: var(--font-display); font-size: 2.4rem; font-weight: 700; color: var(--text-white); }
  .pf-section-title.centered { flex-direction: column; text-align: center; justify-content: center; }

  /* Timeline */
  .pf-timeline { display: flex; flex-direction: column; gap: 0; position: relative; }
  .pf-timeline::before { content: ''; position: absolute; left: 13px; top: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, var(--gold-dark), transparent); }
  .pf-timeline-item { display: flex; gap: 32px; padding-bottom: 30px; position: relative; }
  .timeline-dot {
    width: 28px; height: 28px; border-radius: 50%;
    background: var(--bg-card); border: 3px solid var(--gold);
    flex-shrink: 0; margin-top: 14px;
    box-shadow: 0 0 16px rgba(201,168,76,0.4); position: relative; z-index: 1;
  }
  .timeline-content { flex: 1; }
  .timeline-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; flex-wrap: wrap; gap: 10px; }
  .timeline-header h3 { font-size: var(--text-md); font-weight: 700; color: var(--text-white); }
  .timeline-sub { font-size: var(--text-sm); color: var(--text-secondary); margin-top: 4px; }
  .timeline-right { display: flex; flex-direction: column; align-items: flex-end; gap: 7px; }
  .timeline-date { font-size: var(--text-xs); color: var(--text-muted); font-family: var(--font-mono); }
  .timeline-content p { color: var(--text-secondary); font-size: var(--text-sm); line-height: 1.8; }

  /* Skills */
  .skills-categories { display: grid; grid-template-columns: repeat(2, 1fr); gap: 36px; }
  .cat-title { font-size: var(--text-xs); font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); margin-bottom: 18px; font-family: var(--font-mono); }
  .skills-list { display: flex; flex-direction: column; gap: 16px; }
  .skill-top { display: flex; justify-content: space-between; margin-bottom: 8px; }
  .skill-nm { font-size: var(--text-sm); font-weight: 600; color: var(--text-primary); }
  .skill-pct { font-size: var(--text-xs); color: var(--gold); font-family: var(--font-mono); font-weight: 600; }
  .skill-bar { height: 6px; background: rgba(255,255,255,0.07); border-radius: 3px; overflow: hidden; }
  .skill-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--gold-dark), var(--gold-light)); transition: width 1.2s ease; }

  /* Projects */
  .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 26px; }
  .project-card { padding: 0; overflow: hidden; }
  .project-image { height: 200px; overflow: hidden; background: linear-gradient(135deg, var(--bg-secondary), var(--navy)); }
  .project-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
  .project-card:hover .project-image img { transform: scale(1.05); }
  .project-placeholder { display: flex; align-items: center; justify-content: center; font-size: 3rem; color: var(--gold-dark); }
  .project-body { padding: 24px; }
  .project-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
  .project-header h3 { font-size: var(--text-md); font-weight: 700; color: var(--text-white); }
  .project-body p { color: var(--text-secondary); font-size: var(--text-sm); line-height: 1.7; margin-bottom: 16px; }
  .project-tags { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 18px; }
  .tech-tag { padding: 4px 12px; border-radius: 999px; font-size: var(--text-xs); font-weight: 700; background: rgba(201,168,76,0.08); color: var(--gold-light); border: 1px solid var(--gold-border); }
  .project-links { display: flex; gap: 12px; }

  /* Achievements */
  .ach-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 22px; }
  .ach-card { display: flex; gap: 18px; padding: 24px; }
  .ach-icon {
    width: 48px; height: 48px; border-radius: 13px;
    background: linear-gradient(135deg, var(--gold-light), var(--gold-dark));
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem; color: #000; flex-shrink: 0;
  }
  .ach-body h4 { font-size: var(--text-sm); font-weight: 700; margin-bottom: 5px; color: var(--text-white); }
  .ach-meta { font-size: var(--text-xs); color: var(--text-muted); margin-bottom: 10px; }
  .ach-body p { font-size: var(--text-sm); color: var(--text-secondary); margin-bottom: 12px; }
  .ach-link { font-size: var(--text-xs); color: var(--gold); text-decoration: none; display: inline-flex; align-items: center; gap: 6px; }
  .ach-link:hover { color: var(--gold-light); }

  /* Contact */
  .pf-contact { text-align: center; }
  .pf-contact-inner { max-width: 620px; }
  .contact-sub { color: var(--text-secondary); font-size: var(--text-md); margin-bottom: 36px; line-height: 1.8; }
  .contact-info { display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px; }
  .contact-item { display: flex; align-items: center; justify-content: center; gap: 12px; color: var(--text-secondary); text-decoration: none; font-size: var(--text-sm); transition: var(--transition); }
  .contact-item:hover { color: var(--gold); }
  .contact-item i { color: var(--gold); font-size: 1.1rem; }
  .centered-socials { justify-content: center; }
  .social-btn-lg {
    width: 52px; height: 52px; border-radius: 14px;
    background: rgba(255,255,255,0.04); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    color: var(--text-secondary); text-decoration: none;
    transition: var(--transition); font-size: 1.2rem;
  }
  .social-btn-lg:hover { background: rgba(201,168,76,0.1); color: var(--gold); border-color: var(--gold-border); }

  /* Footer */
  .pf-footer {
    padding: 36px 32px; text-align: center;
    border-top: 1px solid var(--border);
    display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;
  }
  .pf-footer p { font-size: var(--text-xs); color: var(--text-muted); }
  .views-count { display: flex; align-items: center; gap: 8px; }

  .loading-screen { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
  .not-found { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; }
  .not-found i { font-size: 4rem; color: var(--gold-dark); }
  .not-found h2 { font-family: var(--font-display); font-size: 2.4rem; color: var(--text-white); }
  .not-found p { color: var(--text-secondary); font-size: var(--text-md); }

  @media (max-width: 768px) {
    .pf-hero-content { flex-direction: column; text-align: center; }
    .pf-meta, .pf-socials { justify-content: center; }
    .pf-nav-links { display: none; }
    .skills-categories { grid-template-columns: 1fr; }
    .projects-grid { grid-template-columns: 1fr; }
  }

  @media print {
    .pf-nav, .btn { display: none !important; }
    .pf-section { padding: 40px 0; }
  }
`]
})
export class PortfolioViewComponent {

}
