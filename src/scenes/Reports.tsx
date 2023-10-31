import React, { useState } from "react";
import Summary from "../components/reports/Summary";
import LineChart from "../components/reports/LineChart";
import ITransaction from "../models/transaction";
import PropblemAreas from "../components/reports/PropblemAreas";
import { Box, Typography, useTheme } from "@mui/material";
import { IChanges } from "../App";
import { IDataForChart } from "../mock/dataTransformer";
import { countData } from "../mock/maths";

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

  const reportsData = countData(transactions);

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
          gridGap: { lg: "4rem", md: "2rem" },
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
            sum={reportsData.overall.total}
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
            sum={reportsData.b2b.total}
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
            sum={reportsData.b2c.total}
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
          <PropblemAreas list={reportsData.problemAreas} />
        </Box>
        <Box
          sx={{
            gridArea: "2/1/3/7",
            background: "#fff",
            borderRadius: "2rem",
          }}
        >
          <LineChart
            active={current}
            reportsData={reportsData}
            chartData={dataForChart}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Reports;
