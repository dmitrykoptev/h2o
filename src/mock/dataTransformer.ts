import ITransaction from "../models/transaction";

export interface IDataForChart {
  id: string;
  color: string;
  data: { x: string; y: number }[];
}

export interface IChartData {
  b2b: IDataForChart[];
  b2c: IDataForChart[];
  overall: IDataForChart[];
}

// Эта функция пересчитывает генерируемые данные по месяцам для отображения их на графике
export const groupTransactionsByMonth = (
  transactions: ITransaction[]
): IChartData => {
  // Вложенная функция, создающая данные для графика.
  const createDataForChart = (
    id: string,
    color: string,
    data: ITransaction[]
  ) => {
    // Создаем объект для суммирования транзакций по месяцам.
    const transactionsByMonth: Record<string, number> = {};

    // Итерируемся по всем транзакциям.
    data.forEach((transaction) => {
      // Преобразуем дату транзакции в месяц и год, исходя из локали "RU".
      const date = new Date(transaction.date);
      const monthName = date
        .toLocaleString("RU", { month: "short" })
        .slice(0, 3);

      // Если месяц еще не существует в объекте transactionsByMonth, создаем его и инициализируем сумму нулем.
      if (!transactionsByMonth[monthName]) {
        transactionsByMonth[monthName] = 0;
      }

      // Суммируем транзакции в соответствующем месяце.
      transactionsByMonth[monthName] += transaction.amount;
    });

    // Преобразуем объект transactionsByMonth в массив объектов для графика.
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

  // Вложенная функция, обрабатывающая транзакции для конкретного типа (прибыль, расходы) и подразделения (B2B, B2C, overall).
  const processDivision = (division: string) => {
    let divisionTransactions: ITransaction[] = [];
    if (division !== "overall") {
      // Фильтруем транзакции по типу (прибыль, расходы) и подразделению.
      divisionTransactions = transactions.filter(
        (transaction) => transaction.division === division
      );
    } else if (division === "overall") {
      // Если подразделение "overall", используем все транзакции без фильтрации.
      divisionTransactions = transactions;
    }

    // Создаем данные для графика "Прибыль" и получаем общую сумму.
    const divisionTotal = createDataForChart(
      `Прибыль`,
      "#45AAF2",
      divisionTransactions
    );

    // Создаем объекты для хранения сумм прибыли и расходов по месяцам.
    const divisionIncomes: Record<string, number> = {};
    const divisionExpenses: Record<string, number> = {};

    // Итерируемся по транзакциям и суммируем прибыли и расходы по месяцам.
    divisionTransactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthName = date
        .toLocaleString("ru", { month: "short" })
        .slice(0, 3);
      if (transaction.type === "income") {
        divisionIncomes[monthName] =
          (divisionIncomes[monthName] || 0) + transaction.amount;
      } else if (transaction.type === "expenses") {
        divisionExpenses[monthName] =
          (divisionExpenses[monthName] || 0) + transaction.amount;
      }
    });

    // Обновляем данные "Прибыль" в соответствии с разницей между затратами и расходами.
    divisionTotal.data.forEach((item) => {
      const month = item.x;
      const income = divisionIncomes[month] || 0;
      const expense = divisionExpenses[month] || 0;
      item.y = income - expense;
    });

    // Возвращаем массив данных для графика: "Прибыль", "Затраты", "Выручка".
    return [
      divisionTotal,
      createDataForChart(
        `Затраты`,
        "#30C7DC",
        divisionTransactions.filter(
          (transaction) => transaction.type === "expenses"
        )
      ),
      createDataForChart(
        `Выручка`,
        "#73CF7A",
        divisionTransactions.filter(
          (transaction) => transaction.type === "income"
        )
      ),
    ];
  };

  // Обработка данных для дивизионов B2B, B2C и overall.
  const b2bData = processDivision("B2B");
  const b2cData = processDivision("B2C");
  const overallData = processDivision("overall");

  // Возвращаем объект с данными для всех дивизионов.
  return { b2b: b2bData, b2c: b2cData, overall: overallData };
};

export const numberTransform = (num: number) => {
  return num
    .toLocaleString("en-US", {
      maximumFractionDigits: 0,
      useGrouping: true,
    })
    .replace(/,/g, " ");
};
