import ITransaction, { Purpose } from "../models/transaction";

export interface ICountedData {
  b2b: { incomes: number; expenses: number; total: number };
  b2c: { incomes: number; expenses: number; total: number };
  overall: { incomes: number; expenses: number; total: number };
  problemAreas: { name: string; sum: number }[];
}

export const countData = (transactions: ITransaction[]): ICountedData => {
  // B2B
  const b2bTransactions = transactions.filter(
    (item) => item.division === "B2B"
  );

  const b2bExpenses = b2bTransactions
    .filter((item) => item.type === "expenses")
    .reduce((accumulator, item) => accumulator + item.amount, 0);

  const b2bIncomes = b2bTransactions
    .filter((item) => item.type === "income")
    .reduce((accumulator, item) => accumulator + item.amount, 0);

  const b2bTotal = b2bIncomes - b2bExpenses;

  // B2C
  const b2cTransactions = transactions.filter(
    (item) => item.division === "B2C"
  );

  const b2cExpenses = b2cTransactions
    .filter((item) => item.type === "expenses")
    .reduce((accumulator, item) => accumulator + item.amount, 0);

  const b2cIncomes = b2cTransactions
    .filter((item) => item.type === "income")
    .reduce((accumulator, item) => accumulator + item.amount, 0);

  const b2cTotal = b2cIncomes - b2cExpenses;

  // Итоги
  const overallIncomes = b2bIncomes + b2cIncomes;
  const overallExpenses = b2bExpenses + b2cExpenses;
  const overallTotal = b2cTotal + b2bTotal;

  // Проблемные зоны
  const purposeSummarize = (purpose: Purpose) => {
    const expenses = transactions.filter((item) => item.type === "expenses");

    return expenses
      .filter((item) => item.purpose === purpose)
      .reduce((accumulator, item) => accumulator + item.amount, 0);
  };

  const expensesOnPurpose = [
    {
      name: Purpose.LineStaff,
      sum: purposeSummarize(Purpose.LineStaff),
    },
    {
      name: Purpose.WorkUnit,
      sum: purposeSummarize(Purpose.WorkUnit),
    },
    {
      name: Purpose.GasCash,
      sum: purposeSummarize(Purpose.GasCash),
    },
    {
      name: Purpose.InventoryPurchase,
      sum: purposeSummarize(Purpose.InventoryPurchase),
    },
    {
      name: Purpose.SpecialClothing,
      sum: purposeSummarize(Purpose.SpecialClothing),
    },
    {
      name: Purpose.EquipmentRepair,
      sum: purposeSummarize(Purpose.EquipmentRepair),
    },
    {
      name: Purpose.CarMaintenance,
      sum: purposeSummarize(Purpose.CarMaintenance),
    },
    {
      name: Purpose.ForceMajeure,
      sum: purposeSummarize(Purpose.ForceMajeure),
    },
    {
      name: Purpose.BloggerBudgets,
      sum: purposeSummarize(Purpose.BloggerBudgets),
    },
    {
      name: Purpose.ContextBudgets,
      sum: purposeSummarize(Purpose.ContextBudgets),
    },
  ];

  return {
    b2b: { incomes: b2bIncomes, expenses: b2bExpenses, total: b2bTotal },
    b2c: { incomes: b2cIncomes, expenses: b2cExpenses, total: b2cTotal },
    overall: {
      incomes: overallIncomes,
      expenses: overallExpenses,
      total: overallTotal,
    },
    problemAreas: expensesOnPurpose,
  };
};
