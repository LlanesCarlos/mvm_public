import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  userProfile: any;
  categories: any[] = []; 

  constructor(private router: Router,
    private alertService: AlertService,
    private authService: AuthService,
    private categoriesService: CategoriesService
  ) { }
  ngOnInit(): void {
    this.getCategories()
  /*   if (this.authService.isAuthenticated()) {
      this.authService.getProfile().subscribe(
        (profile) => {
          this.userProfile = profile;
        },
        (error) => {
          console.error('Error al obtener el perfil del usuario', error);
        }
      );
    } */
  }

  getCategories() {
    this.categoriesService.getCategories(15).subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error al obtener las categorías', error);
      }
    );
  }

}
