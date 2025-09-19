import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { ApiResponse } from "./auth/models";
import { environment } from "../environments/environment";
import { AuthService } from "./auth/auth.service";

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiBase;
  private auth = inject(AuthService);

  constructor(private http: HttpClient) { }

  ask(question: string): Observable<ApiResponse> {
    const token = this.auth.token;
    const headers = token ? { 'Authorization': `Bearer ${token}` } : undefined;
    return this.http.post<ApiResponse>(`${this.base}/ask`, { question }, { headers });
  }

  health(): Observable<any> {
    const token = this.auth.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    return this.http.get<any>(`${this.base}/health`, { headers });
  }

  login(email: string, password: string) {
    return this.http
      .post<{ token: string; user: any }>(`${this.base}/auth/login`, { email, password })
      .pipe(tap(res => { this.auth.token = res.token; }));
  }
}