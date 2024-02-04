import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialog
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Transaction } from '../../../models/transaction';
import { TransactionService } from '../../../services/transaction.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
@Component({
  selector: 'st-transactions-overview',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule, MatButtonModule, MatIconModule, MatCardModule
  ],
  templateUrl: './transactions-overview.component.html',
  styleUrl: './transactions-overview.component.scss'
})
export class TransactionsOverviewComponent implements OnInit {

  columnNames: string[] = ['name', 'date', 'category', 'priceInEuro', 'actions'];
  transactions: Transaction[];

  constructor(
    private transactionService: TransactionService,
    public dialog: MatDialog) {

  }

  public ngOnInit(): void {
    this.transactionService.getTransactions().pipe().subscribe({
      next: (transactions: Transaction[]) => {
        this.transactions = transactions;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  openDialog(transaction: Transaction): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { ...transaction } as Transaction,
      height: '50%',
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      const index = this.transactions.findIndex((transaction) => transaction.id === result.id);
      console.log(index);
      this.transactions[index] = result;
      console.log(result)
    });
  }
}
