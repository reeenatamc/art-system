import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        const user = await this.authService.login(email, password);
        console.log('Login exitoso:', user);

        // Redirecciona a la página de inicio (o la que desees)
        this.router.navigate(['/landing-page']);
      } catch (error: any) {
        console.error('Login error:', error);
        const message = error?.message || '';

        if (message.includes('auth/invalid-email')) {
          this.errorMessage = 'Email incorrecto';
        } else if (message.includes('auth/user-not-found') || message.includes('auth/wrong-password')) {
          this.errorMessage = 'Contraseña incorrecta';
        } else {
          this.errorMessage = 'Credenciales incorrectas';
        }
      }
    }
  }
}
