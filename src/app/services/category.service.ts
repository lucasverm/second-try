import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor() { }

  private category1: Category = {
    id: 2,
    name: "Huur",
    children: []
  } as Category

  private category2: Category = {
    id: 2,
    name: "Vrije tijd",
    children: []
  } as Category

  categories: Category[] = [this.category1, this.category2]

  public getCategories(): Observable<Category[]> {
    return of(this.categories);
  }

  public getCategoryById(id: number): Observable<Category> {
    if (id === 1) {
      return of(this.category1)
    } else {
      return of(this.category2)
    }
  }
}
