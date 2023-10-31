import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { IDataForChart, numberTransform } from "../../mock/dataTransformer";
import { ReactComponent as RevenueIcon } from "../../assets/icons/revenue.svg";
import { ReactComponent as IncomesIcon } from "../../assets/icons/incomes.svg";
import { ReactComponent as ExpensesIcon } from "../../assets/icons/expenses.svg";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { ICountedData } from "../../mock/maths";
import { current } from "@reduxjs/toolkit";

interface ILineChartProps {
  active: string;
  chartData: {
    b2b: IDataForChart[];
    b2c: IDataForChart[];
    total: IDataForChart[];
  };
  reportsData: ICountedData;
}

const LineChart = ({ chartData, active, reportsData }: ILineChartProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100%",
        padding: "3rem 3.2rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h2"
        fontWeight={700}
        color={theme.palette.secondary.dark}
        mb="1rem"
      >
        Общая статистика{" "}
      </Typography>
      <Box sx={{ height: "28rem" }}>
        <ResponsiveLine
          data={
            active === "Итоги"
              ? chartData.total
              : active === "B2B"
              ? chartData.b2b
              : chartData.b2c
          }
          theme={{
            axis: {
              ticks: {
                line: {
                  strokeWidth: 0,
                },
                text: {
                  fontSize: 14,
                  fill: theme.palette.secondary.light,
                },
              },
            },
            grid: {
              line: {
                stroke: "#F8F8F8",
                strokeWidth: 2,
              },
            },
          }}
          colors={{ datum: "color" }}
          margin={{ top: 20, right: 40, bottom: 28, left: 40 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          yFormat=" >-.2f"
          curve="natural"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          axisLeft={null}
          enableGridX={true}
          enableGridY={false}
          pointSize={10}
          pointColor={{ from: "color", modifiers: [] }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor", modifiers: [] }}
          enableCrosshair={false}
          useMesh={true}
        />
      </Box>
      <List
        sx={{
          padding: 0,
          display: "flex",
          gap: "0.3rem",
        }}
      >
        <ListItem>
          <RevenueIcon />
          <ListItemText
            style={{ marginLeft: "1rem" }}
            primary={
              <Typography
                variant="h5"
                fontWeight={500}
                color={theme.palette.secondary.main}
              >
                Выручка
              </Typography>
            }
            secondary={
              <Typography
                variant="h3"
                fontWeight={700}
                color={theme.palette.secondary.dark}
              >
                ₽{" "}
                {numberTransform(
                  active === "Итоги"
                    ? reportsData.overall.incomes
                    : active === "B2B"
                    ? reportsData.b2b.incomes
                    : reportsData.b2c.incomes
                )}
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <ExpensesIcon />
          <ListItemText
            style={{ marginLeft: "1rem" }}
            primary={
              <Typography
                variant="h5"
                fontWeight={500}
                color={theme.palette.secondary.main}
              >
                Затраты
              </Typography>
            }
            secondary={
              <Typography
                variant="h3"
                fontWeight={700}
                color={theme.palette.secondary.dark}
              >
                ₽{" "}
                {numberTransform(
                  active === "Итоги"
                    ? reportsData.overall.expenses
                    : active === "B2B"
                    ? reportsData.b2b.expenses
                    : reportsData.b2c.expenses
                )}
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <IncomesIcon />
          <ListItemText
            style={{ marginLeft: "1rem" }}
            primary={
              <Typography
                variant="h5"
                fontWeight={500}
                color={theme.palette.secondary.main}
              >
                Прибыль
              </Typography>
            }
            secondary={
              <Typography
                variant="h3"
                fontWeight={700}
                color={theme.palette.secondary.dark}
              >
                ₽{" "}
                {numberTransform(
                  active === "Итоги"
                    ? reportsData.overall.total
                    : active === "B2B"
                    ? reportsData.b2b.total
                    : reportsData.b2c.total
                )}
              </Typography>
            }
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default LineChart;
