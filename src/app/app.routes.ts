import { Routes } from '@angular/router';
import { CategoryOverviewComponent } from './components/category/category-overview/category-overview.component';
import { TransactionsOverviewComponent } from './components/transactions/transactions-overview/transactions-overview.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'transactions' },
  { path: 'transactions', component: TransactionsOverviewComponent },
  { path: 'category', component: CategoryOverviewComponent }
];
