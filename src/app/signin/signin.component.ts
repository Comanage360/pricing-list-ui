import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  selectedImage: string = '';
  loginForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';

  private baseURL = 'https://pricing-api.dev-comanage360.com';
  private loginEndpoint = '/auth/login';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const wallpapers = [
      './assets/wallpaper-1.jpeg',
      './assets/wallpaper-2.jpeg',
      './assets/wallpaper-3.jpeg',
      './assets/wallpaper-4.jpeg',
      './assets/wallpaper-5.jpeg',
      './assets/wallpaper-7.jpeg',
    ];

    const randomIndex = Math.floor(Math.random() * wallpapers.length);
    this.selectedImage = wallpapers[randomIndex];
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const payload = this.loginForm.value;

    this.http.post(`${this.baseURL}${this.loginEndpoint}`, payload).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        console.log('Login successful:', response.token);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login error:', error);
        this.errorMessage = error.error?.message || 'Login failed. Please try again.';
      }
    });
  }

  // Helper for form validation in template
  get f(): { [key: string]: FormControl } {
    return this.loginForm.controls as { [key: string]: FormControl };
  }
}
