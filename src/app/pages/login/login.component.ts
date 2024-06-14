import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: any;
  pass:any;

  constructor(private router: Router) {}


  login() {
    console.log(this.email, this.pass)
    if (this.email === 'alebenitez@gmail.com' && this.pass === '1234') {
      this.router.navigate(['/home']); // Reemplaza '/ruta-especifica' con la ruta a la que deseas redirigir
    } else {
      alert('Correo electrónico o contraseña incorrectos');
    }
  }

}
