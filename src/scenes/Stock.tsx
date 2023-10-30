import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

const Stock = () => {
  const theme = useTheme();

  return (
    <Box className="tablets">
      <Typography
        variant="h1"
        fontWeight={700}
        color={theme.palette.secondary.dark}
      >
        Cклад
      </Typography>
    </Box>
  );
};

export default Stock;
