import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'isNightMode';
  private isNightMode$ = new BehaviorSubject<boolean>(this.loadTheme());

  private loadTheme(): boolean {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? JSON.parse(saved) : true;
  }

  toggleTheme() {
    const newValue = !this.isNightMode$.value;
    this.setTheme(newValue);
  }

  setTheme(value: boolean) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(value));
    this.isNightMode$.next(value);
  }

  getTheme() {
    return this.isNightMode$.asObservable();
  }

  isNightMode(): boolean {
    return this.isNightMode$.value;
  }
}
