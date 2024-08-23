import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  userProfile: User;
  addresses: any[] = [];
  userId: any;
  seccionActiva: string = 'datos-personales'; 

  constructor(private authService: AuthService,
    private addressService: AddressService
  ) { }

  async ngOnInit() {
    await this.loadUserProfile();
    this.getUserAddresses();
  }

  loadUserProfile() {
    return new Promise((resolve, reject) => {
      this.authService.getProfile().subscribe(
        (profile) => {
          this.userProfile = profile;
          this.userId = this.userProfile.id;
          resolve(this.userId);
        },
        (error) => {
          console.error('Error al obtener el perfil del usuario', error);
        }
      );
    });
  }
  saveProfile(): void {
    console.log('Perfil guardado:', this.userProfile);
  }

  mostrarSeccion(seccion: string): void {
    this.seccionActiva = seccion;
  }

  getUserAddresses() {
    // return new Promise((resolve, reject) => { 
      this.addressService.getUserAddresses(this.userId).subscribe(
        (data: any) => {
          this.addresses = data;
        },
        (error) => {
          console.error('Error al obtener las direcciones:', error);
        }
      );
    //});
    
  }
}
