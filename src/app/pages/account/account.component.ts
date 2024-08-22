import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.mode';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  userProfile: User;
  // userProfile = {
  //   name: 'Maria',
  //   lastname: 'Lopez',
  //   phone: '',
  //   email: 'maria@gmail.com',
  //   companyName: '',
  //   ruc: '',
  //   id:''
  // };
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
