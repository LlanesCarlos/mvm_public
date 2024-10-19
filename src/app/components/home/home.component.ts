import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: any[] = [];

  constructor(
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
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