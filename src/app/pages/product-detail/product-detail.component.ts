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
  product: Product | undefined;
  categoryName: string | undefined;

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
            this.loadCategoryName(product.categoryId); 
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

  addToCart(product: Product | undefined) {
    if (product) {
      this.cartService.addToCart(product);
    }
  }
}
