import React, { useState } from "react";
import Summary from "../components/reports/Summary";
import PropblemAreas from "../components/reports/PropblemAreas";
import LineChart from "../components/reports/LineChart";
import ITransaction, { Purpose } from "../models/transaction";
import { Box, Typography, useTheme } from "@mui/material";
import { IChanges } from "../App";
import { IDataForChart } from "../mock/dataTransformer";

interface IReportsProps {
  transactions: ITransaction[];
  changes: IChanges;
  dataForChart: {
    b2b: IDataForChart[];
    b2c: IDataForChart[];
    total: IDataForChart[];
  };
}

export interface IPurposeExpenses {
  name: string;
  sum: number;
}

const Reports = ({ transactions, changes, dataForChart }: IReportsProps) => {
  const theme = useTheme();
  const [current, setCurrent] = useState("Итоги");

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

  const b2bSummary = b2bIncomes - b2bExpenses;

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

  const b2cSummary = b2cIncomes - b2cExpenses;

  // Итоги
  const summary = b2cSummary + b2bSummary;

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

  return (
    <Box className="tablets">
      <Typography
        variant="h1"
        fontWeight={700}
        color={theme.palette.secondary.dark}
      >
        Сводный отчет
      </Typography>
      <Box
        sx={{
          marginTop: "2rem",
          display: "grid",
          gridTemplateColumns: "repeat(9, 1fr)",
          gridTemplateRows: "16.8rem 42.6rem",
          gridGap: "4rem",
        }}
      >
        <Box
          sx={{
            gridArea: "1/1/2/3",
            borderRadius: "2rem",
          }}
          onClick={() => {
            setCurrent("Итоги");
          }}
        >
          <Summary
            title="Итоги"
            sum={summary}
            percent={changes.total}
            active={current}
          />
        </Box>
        <Box
          sx={{
            gridArea: "1/3/2/5",
          }}
          onClick={() => {
            setCurrent("B2B");
          }}
        >
          <Summary
            title="B2B"
            sum={b2bSummary}
            percent={changes.b2b}
            active={current}
          />
        </Box>
        <Box
          sx={{
            gridArea: "1/5/2/7",
          }}
          onClick={() => {
            setCurrent("B2C");
          }}
        >
          <Summary
            title="B2C"
            sum={b2cSummary}
            percent={changes.b2c}
            active={current}
          />
        </Box>
        <Box
          sx={{
            gridArea: "1/7/3/10",
            background: "#fff",
            borderRadius: "2rem",
            overflow: "hidden",
          }}
        >
          <PropblemAreas list={expensesOnPurpose} />
        </Box>
        <Box
          sx={{
            gridArea: "2/1/3/7",
            background: "#fff",
            borderRadius: "2rem",
          }}
        >
          <LineChart active={current} data={dataForChart} />
        </Box>
      </Box>
    </Box>
  );
};

export default Reports;
