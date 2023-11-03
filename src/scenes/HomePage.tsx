import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const theme = useTheme();

  return (
    <Box className="tablets">
      <Typography
        variant="h1"
        fontWeight={700}
        color={theme.palette.secondary.dark}
      >
        Главная страница
      </Typography>
      <Typography variant="h2" mt={2}>
        Это выполненное тестовое задание для одной компании.
        <br /> Перейдите в раздел "Сводный Отчет", там лежит основная часть
        задания.
        <br /> Новые данные генерируются в компоненте App на каждое его
        обновление.
        <br /> В реализации использовались{" "}
        <span style={{ fontWeight: 800 }}>
          React + Typescript, Material UI, React-Pro-Sidebar, Nivo Charts
        </span>
        <br /> Код можно посмотреть здесь:{" "}
        <Link
          target="_blank"
          to="https://github.com/dmitrykoptev/h2o"
          style={{ color: theme.palette.primary.main }}
        >
          github
        </Link>
      </Typography>
      <Typography variant="h3"></Typography>
    </Box>
  );
};

export default HomePage;
