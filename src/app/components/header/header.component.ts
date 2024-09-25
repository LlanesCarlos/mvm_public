import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  userProfile: any;
  categories: any[] = []; 
  cartItemCount: number = 0;

  constructor(private router: Router,
    private alertService: AlertService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private cartService: CartService
  ) { }
  ngOnInit(): void {
    this.getCategories();
    this.cartService.cart$.subscribe(cart => {
      this.cartItemCount = cart.length;
    });
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
  
  goToCart() {
    this.router.navigate(['/cart']);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
