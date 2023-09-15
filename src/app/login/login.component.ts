import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario = '';
  password = '';

  constructor(private router: Router) { }

  ingresar() {
    if (this.usuario === 'admin' && this.password === '123456') {
      this.router.navigate(['/certificados']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}
