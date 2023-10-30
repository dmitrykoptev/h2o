import ITransaction from "../models/transaction";

export interface IDataForChart {
  id: string;
  color: string;
  data: { x: string; y: number }[];
}

// Я честно признаюсь: этот монстр был написан уже в предобморочном состоянии почти целиком на chatGPT
// У меня не было выбора. Прошу прощения....
export const groupTransactionsByMonth = (
  transactions: ITransaction[]
): { b2b: IDataForChart[]; b2c: IDataForChart[]; total: IDataForChart[] } => {
  const createDataForChart = (
    id: string,
    color: string,
    data: ITransaction[]
  ) => {
    const transactionsByMonth: Record<string, number> = {};

    data.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthName = new Intl.DateTimeFormat("en-US", {
        month: "long",
      }).format(date);

      if (!transactionsByMonth[monthName]) {
        transactionsByMonth[monthName] = 0;
      }

      transactionsByMonth[monthName] += transaction.amount;
    });

    const result = Object.entries(transactionsByMonth).map(
      ([month, amount]) => ({
        x: month,
        y: amount,
      })
    );

    return {
      id,
      color,
      data: result,
    };
  };

  const processDivision = (division: string) => {
    let divisionTransactions: ITransaction[] = [];
    if (division !== "total") {
      divisionTransactions = transactions.filter(
        (transaction) => transaction.division === division
      );
    } else if (division === "total") {
      divisionTransactions = transactions;
    }

    const divisionTotal = createDataForChart(
      `Прибыль`,
      "blue",
      divisionTransactions
    );
    const divisionIncomes: Record<string, number> = {};
    const divisionExpenses: Record<string, number> = {};

    divisionTransactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthName = date.toLocaleString("en-US", { month: "long" });
      if (transaction.type === "income") {
        divisionIncomes[monthName] =
          (divisionIncomes[monthName] || 0) + transaction.amount;
      } else if (transaction.type === "expenses") {
        divisionExpenses[monthName] =
          (divisionExpenses[monthName] || 0) + transaction.amount;
      }
    });

    divisionTotal.data.forEach((item) => {
      const month = item.x;
      const income = divisionIncomes[month] || 0;
      const expense = divisionExpenses[month] || 0;
      item.y = income - expense;
    });

    return [
      divisionTotal,
      createDataForChart(
        `Затраты`,
        "grey",
        divisionTransactions.filter(
          (transaction) => transaction.type === "expenses"
        )
      ),
      createDataForChart(
        `Выручка`,
        "black",
        divisionTransactions.filter(
          (transaction) => transaction.type === "income"
        )
      ),
    ];
  };

  const b2bData = processDivision("B2B");
  const b2cData = processDivision("B2C");
  const totalData = processDivision("total");

  return { b2b: b2bData, b2c: b2cData, total: totalData };
};
