import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../../../../shared/services/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit(): Promise<void> {
    this.loading = true;
    this.errorMessage = '';
    const { email, password } = this.loginForm.value;

    const { user, error } = await this.supabaseService.login(email, password);
    this.loading = false;

    if (error) {
      this.errorMessage = 'Email hoặc mật khẩu không chính xác!';
    } else if (user) {
      this.router.navigate(['/dashboard']);
    }
  }

  async handleGoogleLogin(): Promise<void> {
    this.loading = true;
    await this.supabaseService.loginWithGoogle();
  }
}