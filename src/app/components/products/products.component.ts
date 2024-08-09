import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  product: any;
  products: any[] = [];

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      data => {
        this.products = data;
        console.log(this.products);
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }

  getProduct(id: number) {
    this.productService.getProductById(id).subscribe(
      data => {
        this.product = data;
        console.log(this.product);
      },
      error => {
        console.error('Error fetching product', error);
      }
    );
  }
}
