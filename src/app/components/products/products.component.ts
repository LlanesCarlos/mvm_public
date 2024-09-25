import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any[] = [];
  selectedCategories: number[] = [];
  priceMin: number = 0;
  priceMax: number = 0;

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const categoryId = +params['id'];
      if (categoryId) {
        this.getProductsByCategory(categoryId);
      } else {
        this.getAllProducts();  // Cargar todos los productos si no hay categoría seleccionada
      }
    });
  }



  getProductsByCategory(categoryId: number) {
    this.categoriesService.getCategoryProducts(categoryId).subscribe(
      products => {
        this.products = products;
      },
      error => {
        console.error('Error fetching products by category', error);
      }
    );
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe(
      data => {
        this.products = data;
        console.log(this.products);
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
    
  }

  onFiltersApplied() {
    this.productsService.getFilteredProducts(this.selectedCategories, this.priceMin, this.priceMax).subscribe(
      data => {
        this.products = data;
      },
      error => {
        console.error('Error fetching filtered products', error);
      }
    );
  }

  handleFilters(filters: any) {
    this.selectedCategories = filters.categories;
    this.priceMin = filters.priceRange.min;
    this.priceMax = filters.priceRange.max;
    this.onFiltersApplied();
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  viewProductDetail(productId: number) {
    this.router.navigate(['/product', productId]);
  }
 
}
