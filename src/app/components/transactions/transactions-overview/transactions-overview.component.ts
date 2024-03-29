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
import { NotificationService } from '../../../services/notification.service';
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
    public dialog: MatDialog,
    private notificationService: NotificationService) {

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

  public addTransaction(): void {
    let transaction: Transaction = {} as Transaction;
    this.openDialog(transaction);
  }

  public editTransaction(transaction: Transaction): void {
    let transactionToEdit = { ...transaction }
    this.openDialog(transactionToEdit);
  }

  public deleteTransaction(transaction: Transaction): void {
    this.notificationService.confirmation("Are you sure?", () => {
      this.transactions = this.transactions.filter(obj => obj !== transaction);
    }, "Delete transaction?", () => { })
  }

  private openDialog(transaction: Transaction): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: transaction as Transaction,
    });
    dialogRef.afterClosed().subscribe({
      next: value => {
        if (value !== undefined) {
          this.addOrUpdatetransaction(value);
          this.notificationService.success('Transaction updated!')
        } else {
          this.notificationService.error('Transaction update failed!')
        }
      }
    });
  }

  private addOrUpdatetransaction(changedTransaction: Transaction): void {
    if (changedTransaction.id === undefined) {
      this.transactions = [...this.transactions, changedTransaction]
    } else {
      let indexToUpdate = this.transactions.findIndex((transaction: Transaction) => transaction.id === changedTransaction.id);
      this.transactions[indexToUpdate] = changedTransaction;
      this.transactions = [...this.transactions]
    }
  }
}
