import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Portfolio } from '../models/portfolio.model';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private apiUrl = environment.apiUrl;
  private portfolioSubject = new BehaviorSubject<Portfolio | null>(null);
  portfolio$ = this.portfolioSubject.asObservable();

  constructor(private http: HttpClient) {}

  getMyPortfolio(): Observable<Portfolio> {
    return this.http.get<Portfolio>(`${this.apiUrl}/portfolio/me`)
      .pipe(tap(p => this.portfolioSubject.next(p)));
  }

  updatePortfolio(data: Partial<Portfolio>): Observable<Portfolio> {
    return this.http.put<Portfolio>(`${this.apiUrl}/portfolio/me`, data)
      .pipe(tap(p => this.portfolioSubject.next(p)));
  }

  togglePublish(): Observable<{ isPublished: boolean; shareId: string }> {
    return this.http.patch<{ isPublished: boolean; shareId: string }>(
      `${this.apiUrl}/portfolio/me/publish`, {}
    );
  }

  getPublicPortfolio(shareId: string): Observable<Portfolio> {
    return this.http.get<Portfolio>(`${this.apiUrl}/portfolio/view/${shareId}`);
  }

  deleteSectionItem(section: string, itemId: string): Observable<Portfolio> {
    return this.http.delete<Portfolio>(`${this.apiUrl}/portfolio/me/${section}/${itemId}`)
      .pipe(tap(p => this.portfolioSubject.next(p)));
  }

  getCurrentPortfolio(): Portfolio | null {
    return this.portfolioSubject.value;
  }
}