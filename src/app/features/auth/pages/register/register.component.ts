import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../../../../shared/services/supabase.service';
import { confirmPasswordValidator } from '../../../../shared/validators/confirm-password.validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: confirmPasswordValidator
    });
  }

  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  async onSubmit(): Promise<void> {
    this.loading = true;
    this.errorMessage = '';
    const { name, email, password } = this.registerForm.value;

    const { user, error } = await this.supabaseService.register(email, password, name);
    this.loading = false;

    if (error) {
      this.errorMessage = error.message || 'Đăng ký thất bại!';
    } else if (user) {
      this.router.navigate(['/dashboard']);
    }
  }

  async handleGoogleLogin(): Promise<void> {
    this.loading = true;
    await this.supabaseService.loginWithGoogle();
  }
}