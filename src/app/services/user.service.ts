import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BudgetPost } from '../models/budget-post';
import { IncomeSource } from '../models/income-source';
import { MounthOverview } from '../models/mounth-overview';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  private budgetPostHuur: BudgetPost = {
    id: 1,
    name: "Huur",
    category: "Sparen",
    amount: 417,
  } as BudgetPost

  private incomeSourceLoon: IncomeSource = {
    id: 1,
    name: "Loon",
    amount: 2150
  } as IncomeSource

  private transaction: Transaction = {
    id: 1,
    name: "Bakker",
    date: new Date(),
    category: "Eten",
    priceInEuro: 4.4,
  } as Transaction

  private mounthOverview: MounthOverview = {
    id: 1,
    date: new Date(),
    mounthIncome: [this.incomeSourceLoon],
    mounthExpenses: [this.transaction],
    budget: [this.budgetPostHuur]
  }


  constructor() { }

  public getMounthOverview(id: Number): Observable<MounthOverview> {
    return of(this.mounthOverview);
  }

}
