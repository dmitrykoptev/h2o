import React, { useEffect, useState } from "react";
import customTheme from "./theme";
import MySidebar from "./scenes/global/MySidebar";
import HomePage from "./scenes/HomePage";
import Tasks from "./scenes/Tasks";
import Stock from "./scenes/Stock";
import Team from "./scenes/Team";
import Assets from "./scenes/Assets";
import Reports from "./scenes/Reports";
import Settings from "./scenes/Settings";
import Header from "./scenes/global/Header";
import ILink from "./models/links";
import { Route, Routes, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ReactComponent as HomePageIcon } from "./assets/icons/calendar.svg";
import { ReactComponent as ListIcon } from "./assets/icons/list.svg";
import { ReactComponent as BoxIcon } from "./assets/icons/box.svg";
import { ReactComponent as PersonalIcon } from "./assets/icons/personal.svg";
import { ReactComponent as AssetsIcon } from "./assets/icons/assets.svg";
import { ReactComponent as PieIcon } from "./assets/icons/pie.svg";
import { ReactComponent as SettingsIcon } from "./assets/icons/settings.svg";
import generateData from "./mock/dataGenerator";
import { groupTransactionsByMonth } from "./mock/dataTransformer";

export interface IChanges {
  b2b: number;
  b2c: number;
  total: number;
}

const links: ILink[] = [
  { name: "Главная", link: "/", icon: <HomePageIcon /> },
  { name: "Задачи", link: "/tasks", icon: <ListIcon /> },
  { name: "Склад", link: "/stock", icon: <BoxIcon /> },
  { name: "Команда", link: "/team", icon: <PersonalIcon /> },
  { name: "Финансы", link: "/assets", icon: <AssetsIcon /> },
  { name: "Сводный отчет", link: "/reports", icon: <PieIcon /> },
  { name: "Настройки", link: "/settings", icon: <SettingsIcon /> },
];

function App() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  // Генерируются данные
  const transactions = generateData();

  // Генерируются процентные изменения
  const changes: IChanges = {
    b2b: Math.round((Math.random() * 200 - 100) * 10) / 10,
    b2c: Math.round((Math.random() * 200 - 100) * 10) / 10,
    total: Math.round((Math.random() * 200 - 100) * 10) / 10,
  };

  // Создается массив со значениями для графика
  const dataForChart = groupTransactionsByMonth(transactions.data);

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <div className="app">
          <MySidebar links={links} active={currentPath} />
          <main className="mainPart">
            <Header links={links} active={currentPath} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/stock" element={<Stock />} />
              <Route path="/team" element={<Team />} />
              <Route path="/assets" element={<Assets />} />
              <Route
                path="/reports"
                element={
                  <Reports
                    changes={changes}
                    transactions={transactions.data}
                    dataForChart={dataForChart}
                  />
                }
              />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
