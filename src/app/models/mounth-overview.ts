import { BudgetPost } from "./budget-post";
import { IncomeSource } from "./income-source";
import { Transaction } from "./transaction";

export interface MounthOverview {
  id: number;
  date: Date;
  mounthIncome: IncomeSource[];
  mounthExpenses: Transaction[];
  budget: BudgetPost[];
}
