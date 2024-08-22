import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  //userProfile: any;
  userProfile = {
    firstName: 'Maria',
    lastName: 'Lopez',
    phone: '',
    email: 'maria@gmail.com',
    companyName: '',
    ruc: ''
  };
  seccionActiva: string = 'datos-personales'; 

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.authService.getProfile().subscribe(
      (profile) => {
        this.userProfile = profile;
        console.log(this.userProfile)
      },
      (error) => {
        console.error('Error al obtener el perfil del usuario', error);
      }
    );
  }
  saveProfile(): void {
    console.log('Perfil guardado:', this.userProfile);
  }

  mostrarSeccion(seccion: string): void {
    this.seccionActiva = seccion;
  }
}
