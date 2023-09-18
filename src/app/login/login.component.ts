import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario = '';
  password = '';

  constructor(private router: Router, private authService: MsalService) { }

  ingresar() {
    if (this.usuario === 'admin' && this.password === '123456') {
      this.router.navigate(['/certificados']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }

  login() {
    this.authService.loginRedirect();
  }
}
