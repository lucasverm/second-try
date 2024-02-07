import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor() { }

  private transaction1: Transaction = {
    id: 1,
    //name: "BakkerBakkerBakkerBakkerBakkerBakkerBakkerBakkerBakkerBakkerBakkerBakkerBakkerBakkerBakkerBakkerBakkerBakkerBakkerBakker",
    name: "Winkel",
    date: new Date(),
    category: "Eten",
    priceInEuro: 4.4,
  } as Transaction

  private transaction2: Transaction = {
    id: 2,
    name: "Winkel",
    date: new Date(),
    category: "Eten",
    priceInEuro: 55.55,
  } as Transaction

  transactions: Transaction[] = [this.transaction1, this.transaction2]

  public getTransactions(): Observable<Transaction[]> {
    return of(this.transactions);
  }

  public getTransactionById(id: number): Observable<Transaction> {
    if (id === 1) {
      return of(this.transaction1)
    } else {
      return of(this.transaction2)
    }
  }
}
