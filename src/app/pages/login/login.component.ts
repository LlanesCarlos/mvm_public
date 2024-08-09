import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/components/alert/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials = { email: '', password: '' };
  errorMessage: string | null = null;

  constructor(private router: Router,
    private alertService: AlertService,
    private authService: AuthService
  ) {}


  login(): void {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.alertService.error('Email o contraseña incorrectos');
      }
    );
  }

}
