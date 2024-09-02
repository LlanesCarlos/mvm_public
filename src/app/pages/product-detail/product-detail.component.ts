import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any | undefined;
  categoryName: string | undefined;
  quantity: number = 1;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      if (productId) {
        this.productsService.getProductById(productId).subscribe(
          product => {
            this.product = product;
            //his.loadCategoryName(product.categoryId); 
          },
          error => {
            console.error('Error fetching product details', error);
          }
        );
      }
    });
  }

  loadCategoryName(categoryId: number) {
    this.categoriesService.getCategoryById(categoryId).subscribe(
      category => {
        this.categoryName = category.name;
      },
      error => {
        console.error('Error fetching category', error);
      }
    );
  }

  addToCart(product: Product, quantity: number) {
    if (product) {
      const item = { ...product, quantity: this.quantity };
      this.cartService.addToCart(item);
    }
  }

  changeMainImage(imageUrl: string) {
    if (this.product && Array.isArray(this.product.images)) {
      const updatedImages = [imageUrl, ...this.product.images.filter(img => img !== imageUrl)];
      this.product.images = updatedImages;
    }
  }
  
  toggleFavorite(product: Product | undefined) {
    if (product) {
      this.isFavorite = !this.isFavorite;
      if (this.isFavorite) {
        // Lógica para agregar a favoritos
        console.log(`${product.title} added to favorites`);
      } else {
        // Lógica para remover de favoritos
        console.log(`${product.title} removed from favorites`);
      }
    }
  }

}
