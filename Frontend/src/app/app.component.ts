import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <router-outlet></router-outlet>
    <div class="toast-container">
      <div class="toast" [class]="'toast-' + toast.type" *ngFor="let toast of toasts">
        <i [class]="toast.type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"></i>
        {{ toast.message }}
      </div>
    </div>
  `
})
export class AppComponent implements OnInit {
  toasts: any[] = [];
  constructor(private toastService: ToastService) {}
  ngOnInit() {
    this.toastService.toasts$.subscribe(t => this.toasts = t);
  }
}