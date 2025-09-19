import { Component, computed, signal } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiResponse } from '../auth/models';
import { ApiService } from '../app.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeService } from '../../environments/theme.service';

type QuestionForm = FormGroup<{ question: FormControl<string> }>;
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
  toggleTheme() {
    this.theme.toggleTheme();
  }
  isNightMode = true;
  qForm!: QuestionForm;
  loading = signal(false);
  error = signal<string | null>(null);
  resp = signal<ApiResponse | null>(null);

  constructor(private theme: ThemeService, private fb: FormBuilder, private api: ApiService, private auth: AuthService, private route: Router) {
    this.isNightMode = this.theme.isNightMode();
    this.theme.getTheme().subscribe(v => this.isNightMode = v);
    this.qForm = this.fb.nonNullable.group({ question: this.fb.nonNullable.control('') });
  }
  sample(q: string) { this.qForm.patchValue({ question: q }); }

  submit() {
    const question = this.qForm.value.question?.trim();
    if (!question) { this.error.set('Please enter a question'); return; }
    this.loading.set(true); this.error.set(null); this.resp.set(null);
    this.api.ask(question).subscribe({
      next: r => { this.resp.set(r); this.loading.set(false); },
      error: e => { this.error.set(e?.error?.message || 'An error occurred'); this.loading.set(false); }
    });
  }

  rows = computed(() => {
    const r = this.resp();
    if (!r) return [];
    if (r.answers?.length) return r.answers;
    if (r.answer && 'unitPrice' in r.answer) return [r.answer];
    return [];
  });

  isFinalPrice = computed(() => {
    const intent = this.resp()?.intent?.intent;
    return intent === 'final_price_current' || intent === 'final_price_on_date';
  });

  finalAnswer = computed(() => this.isFinalPrice() ? (this.resp()?.answer ?? null) : null);

  discounts = computed(() => {
    const fa: any = this.finalAnswer();
    return Array.isArray(fa?.usedDiscounts) ? fa.usedDiscounts : [];
  });

  logout() { this.auth.logout(); this.route.navigateByUrl('/login'); }

  trackByIdx = (i: number) => i;
}
