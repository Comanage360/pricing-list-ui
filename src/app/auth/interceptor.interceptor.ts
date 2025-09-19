import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  console.log(token);

  // 🧠 Check if the token is expired (if it's a JWT)
  if (token && isTokenExpired(token)) {
    localStorage.clear();
    router.navigate(['/signin']);
    return throwError(() => new Error('Token expired'));
  }

  // Clone request and attach the token
  const newReq = token ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  })
    : req;

  return next(newReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Auto-logout on 401
        localStorage.clear();
        router.navigate(['/signin']);
      }
      return throwError(() => error);
    })
  );
};

// ✅ Utility: Check if token is expired (only works for JWT tokens)
function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    const now = Math.floor(Date.now() / 1000);
    return exp < now;
  } catch (e) {
    return true; // treat invalid token as expired
  }
}