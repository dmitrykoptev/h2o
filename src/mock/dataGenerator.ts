import ITransaction, {
  Division,
  Purpose,
  TransactionType,
} from "../models/transaction";

const generateDivision = () => {
  // Создается массив со значениями енума
  const divisions = Object.values(Division);

  // Создается случайный индекс в пределах полученного массива
  const randomIndex = Math.floor(Math.random() * divisions.length);

  // Возвращается значение массива с полученным индексом
  return divisions[randomIndex];
};

const generateTransactionType = () => {
  const transactionTypes = Object.values(TransactionType);
  const randomIndex = Math.floor(Math.random() * transactionTypes.length);
  return transactionTypes[randomIndex];
};

const generatePurpose = () => {
  const purposes = Object.values(Purpose);
  const randomIndex = Math.floor(Math.random() * purposes.length);
  return purposes[randomIndex];
};

const generateDate = () => {
  // Дата начала отслеживания
  const start = new Date("2022-01-01").getTime();

  // Дата окончания отслеживания
  const end = new Date("2023-01-01").getTime();

  // Случайная дата внутри отрезка создается за счет прибавления на начальной дате
  // произведения случайного числа на разницу между концом и началом временного отрезка
  const date = new Date(start + Math.random() * (end - start));

  // Возвращается дата, приведенная к формату ISO 8601
  return date.toISOString();
};

const generateAmount = () => {
  // Возвращается случайное число в диапозоне от 100 до 10.000
  return Math.floor(Math.random() * (2000 - 100) + 100);
};

export const generateData = () => {
  // Создаем пустой массив тразакций
  let transactions: ITransaction[] = [];

  for (let i = 0; i < 1000; i++) {
    // Сначала создаем тип транзакции
    const type = generateTransactionType();
    // Создаем объект транзакции
    const newTransaction: ITransaction = {
      division: generateDivision(),
      date: generateDate(),
      amount: generateAmount(),
      type: type,
      // Если созданный ранее тип = "expenses", создаем назначение платежа
      purpose:
        type === TransactionType.expenses ? generatePurpose() : undefined,
    };

    // Пушим 1000 транзакций в массив транзакций
    transactions.push(newTransaction);
  }

  // Сортируем по дате
  transactions.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  });

  return { data: transactions };
};

export default generateData;
