import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private key = 'token';
  private expiryKey = 'token_expiry';

  get token(): string | null {
    const token = localStorage.getItem(this.key);
    const expiry = localStorage.getItem(this.expiryKey);

    if (!token || !expiry) {
      return null;
    }

    const now = Date.now();
    if (now > +expiry) {
      this.logout();
      return null;
    }

    return token;
  }

  set token(value: string | null) {
    if (value) {
      const expiryTime = Date.now() + 15 * 60 * 1000;
      localStorage.setItem(this.key, value);
      localStorage.setItem(this.expiryKey, expiryTime.toString());
    } else {
      this.logout();
    }
  }

  get isAuthed(): boolean {
    return !!this.token;
  }
  
  logout() {
    localStorage.removeItem(this.key);
    localStorage.removeItem(this.expiryKey);
  }
}
