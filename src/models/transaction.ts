export enum Division {
  B2B = "B2B",
  B2C = "B2C",
}

export enum TransactionType {
  income = "income",
  expenses = "expenses",
}

export enum Purpose {
  LineStaff = "Линейный персонал",
  WorkUnit = "Подразделение разовых работ ФОТ",
  GasCash = "Бензин (наличные)",
  InventoryPurchase = "Закупка инвентаря",
  SpecialClothing = "Закупка спецодежды/СИЗ",
  EquipmentRepair = "Ремонт оборудования",
  CarMaintenance = "Обслуживание автомобиля",
  ForceMajeure = "Форс-мажоры",
  BloggerBudgets = "Рекламные бюджеты (Блогеры)",
  ContextBudgets = "Рекламные бюджеты (Контекст)",
}

export default interface ITransaction {
  division: Division;
  date: string;
  amount: number;
  type: TransactionType;
  purpose?: Purpose;
}
