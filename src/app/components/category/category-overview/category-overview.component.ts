import { NestedTreeControl } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { Category } from '../../../models/category';
import { CategorieService } from '../../../services/category.service';
import { NotificationService } from '../../../services/notification.service';
import { EditDialogComponent } from '../../transactions/edit-dialog/edit-dialog.component';

@Component({
  selector: 'st-category-overview',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule, MatCardModule,
    MatTreeModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './category-overview.component.html',
  styleUrl: './category-overview.component.scss'
})
export class CategoryOverviewComponent implements OnInit {

  columnNames: string[] = ['name', 'actions'];
  categories: Category[];

  constructor(
    private categorieservice: CategorieService,
    public dialog: MatDialog,
    private notificationService: NotificationService) {
    this.dataSource.data = [
      {
        name: 'Fruit',
        children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
      },
      {
        name: 'Vegetables',
        children: [
          {
            name: 'Green',
            children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
          },
          {
            name: 'Orange',
            children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
          },
        ],
      },
    ];
  }

  treeControl = new NestedTreeControl<any>(node => node.children);
  dataSource = new MatTreeNestedDataSource<any>();

  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;

  public ngOnInit(): void {
    this.categorieservice.getCategories().pipe().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  public addCategory(): void {
    let categories: Category = {} as Category;
    this.openDialog(categories);
  }

  public editCategory(Category: Category): void {
    let categoryToEdit = { ...Category }
    this.openDialog(categoryToEdit);
  }

  public deletecategory(Category: Category): void {
    this.notificationService.confirmation("Are you sure?", () => {
      this.categories = this.categories.filter(obj => obj !== Category);
    }, "Delete Category?", () => { })
  }

  private openDialog(Category: Category): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: Category as Category,
    });
    dialogRef.afterClosed().subscribe({
      next: value => {
        if (value !== undefined) {
          this.addOrUpdatecategory(value);
          this.notificationService.success('Category updated!')
        } else {
          this.notificationService.error('Category update failed!')
        }
      }
    });
  }

  private addOrUpdatecategory(changedcategory: Category): void {
    if (changedcategory.id === undefined) {
      this.categories = [...this.categories, changedcategory]
    } else {
      let indexToUpdate = this.categories.findIndex((Category: Category) => Category.id === changedcategory.id);
      this.categories[indexToUpdate] = changedcategory;
      this.categories = [...this.categories]
    }
  }
}
