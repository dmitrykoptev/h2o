import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

const Team = () => {
  const theme = useTheme();

  return (
    <Box className="tablets">
      <Typography
        variant="h1"
        fontWeight={700}
        color={theme.palette.secondary.dark}
      >
        Команда
      </Typography>
    </Box>
  );
};

export default Team;
