import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/components/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: any;
  pass:any;

  constructor(private router: Router,
    private alertService: AlertService
  ) {}


  login() {
    console.log(this.email, this.pass)
    if (this.email === 'alebenitez@gmail.com' && this.pass === '1234') {
      this.router.navigate(['/home']); // Reemplaza '/ruta-especifica' con la ruta a la que deseas redirigir
    } else {
      this.alertService.error('Correo electrónico o contraseña incorrectos');
    }
  }

}
