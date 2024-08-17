import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-sidebar-filter',
  templateUrl: './sidebar-filter.component.html',
  styleUrls: ['./sidebar-filter.component.css']
})
export class SidebarComponent implements OnInit {
  categories: any[] = [];
  selectedCategories: number[] = [];
  priceMin: number = 0;
  priceMax: number = 0;

  @Output() filtersApplied = new EventEmitter<any>();

  constructor(private categoriesService: CategoriesService) { }

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

  onCategoryChange(categoryId: number) {
    const index = this.selectedCategories.indexOf(categoryId);
    if (index > -1) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(categoryId);
    }
  }

  onFiltersApplied() {
    const filters = {
      categories: this.selectedCategories,
      priceRange: {
        min: this.priceMin,
        max: this.priceMax
      }
    };
    this.filtersApplied.emit(filters);
  }
}