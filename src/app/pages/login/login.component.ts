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
  user = "admin";
  password = "admin";

  constructor(private router: Router,
    private alertService: AlertService
  ) {}


  login() {
    console.log(this.email, this.pass)
    if (this.email === this.user && this.pass === this.password) {
      this.router.navigate(['/home']); 
    } else {
      this.alertService.error('Correo electrónico o contraseña incorrectos');
    }
  }

}
