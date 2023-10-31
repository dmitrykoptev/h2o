import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { ReactComponent as UpIcon } from "../../assets/icons/arrowUp.svg";
import { ReactComponent as DownIcon } from "../../assets/icons/arrowDown.svg";
import { numberTransform } from "../../mock/dataTransformer";

interface ISummaryProps {
  title: string;
  sum: number;
  percent: number;
  active: string;
}

const Summary = ({ title, sum, percent, active }: ISummaryProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100%",
        borderRadius: "2rem",
        background:
          active !== title
            ? "#fff"
            : percent > 0
            ? theme.palette.primary.main
            : theme.palette.warning.main,
        color: active === title ? "#fff" : theme.palette.secondary.dark,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.3s",
        ":hover": {
          transform: "scale(1.03)",
        },
        ":active": {
          transform: "scale(0.99)",
        },
      }}
    >
      <Box
        sx={{
          width: "14.4rem",
          height: "3.6rem",
          marginBottom: "1.3rem",
          borderRadius: "2.4rem",
          background:
            active === title
              ? "rgb(255, 255, 255, 0.25)"
              : percent < 0
              ? "rgba(252, 92, 101, 0.15)"
              : "rgba(84, 211, 194, 0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={600}
          display="flex"
          alignItems="center"
          gap="0.6rem"
          sx={{
            color:
              active === title
                ? "#fff"
                : percent < 0
                ? theme.palette.warning.main
                : theme.palette.primary.main,
            "& path": {
              fill:
                active === title
                  ? "#fff"
                  : percent < 0
                  ? theme.palette.warning.main
                  : theme.palette.primary.main,
            },
          }}
        >
          {percent < 0 ? <DownIcon /> : <UpIcon />}
          {percent} %
        </Typography>
      </Box>
      <Typography fontWeight={600} variant="h1">
        ₽ {numberTransform(sum)}
      </Typography>
      <Typography fontWeight={600} variant="h4">
        {title}
      </Typography>
    </Box>
  );
};

export default Summary;
