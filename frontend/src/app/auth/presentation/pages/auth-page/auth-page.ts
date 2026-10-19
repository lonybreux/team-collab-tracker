import { Component, signal } from '@angular/core';
import { InputField } from '../../../../shared/presentation/components/input-field/input-field';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

type AuthMode = 'login' | 'register'

function passwordMatch(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value
  const confirm = group.get('confirm')?.value
  return password === confirm ? null : { passwordMismatch: true }
}

@Component({
  imports: [InputField, ReactiveFormsModule],
  selector: 'app-auth-page',
  styleUrl: './auth-page.css',
  templateUrl: './auth-page.html',
})
export class AuthPage {
  readonly mode = signal<AuthMode>('login');

  readonly copy = {
    login: {
      title: 'Te damos la bienvenida',
      subtitle: 'Entra para retomar el trabajo de tu equipo.',
      google: 'Continuar con Google',
    },
    register: {
      title: 'Crea tu espacio de equipo',
      subtitle: 'Un par de datos y puedes empezar a organizar tu grupo.',
      google: 'Registrarme con Google',
    },
  };

  readonly loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
    remember: new FormControl(false, { nonNullable: true }),
  });

  readonly registerForm = new FormGroup({
    nombre: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
    confirm: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    terms: new FormControl(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue]
    })
  },
    {validators: passwordMatch});

  setMode(mode: AuthMode): void {
    this.mode.set(mode);
  }
}
