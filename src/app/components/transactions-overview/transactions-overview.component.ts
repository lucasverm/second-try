import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'st-transactions-overview',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './transactions-overview.component.html',
  styleUrl: './transactions-overview.component.scss'
})
export class TransactionsOverviewComponent implements OnInit {

  columnNames: string[] = ['name', 'date', 'category', 'priceInEuro'];
  transactions: Transaction[];

  constructor(private transactionService: TransactionService) {

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
}
