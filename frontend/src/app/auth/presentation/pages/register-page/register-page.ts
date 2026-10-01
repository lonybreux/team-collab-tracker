import { Component } from '@angular/core';
import { Header } from '../../components/header/header';

@Component({
  imports: [Header],
  selector: 'app-register-page',
  styleUrl: './register-page.css',
  templateUrl: './register-page.html',
})
export class RegisterPage {

  readonly question: string = '¿Ya tienes una cuenta?'
  readonly questionAnchor: string = 'inicia sesión'
  readonly questionEntryPoint: string = '/login'
}
