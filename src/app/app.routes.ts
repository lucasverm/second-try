import { Routes } from '@angular/router';
import { TransactionsOverviewComponent } from './components/transactions/transactions-overview/transactions-overview.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'mounth-overiew/1' },
  { path: 'transactions', component: TransactionsOverviewComponent }
];
