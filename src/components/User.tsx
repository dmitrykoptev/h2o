import React from "react";
import userAvatar from "../assets/images/kristina.png";
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { ReactComponent as DropdownIcon } from "../assets/icons/dropdown.svg";

const User = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        marginLeft: { lg: "5.5rem", md: 0 },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "2.3rem" }}>
        <Avatar
          src={userAvatar}
          style={{ width: "5.6rem", height: "5.6rem" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" lineHeight="1.6rem" fontWeight="500">
            Kristina 🐰
          </Typography>
          <Typography variant="h5" color={theme.palette.secondary.main}>
            менеджер продаж
          </Typography>
        </Box>
      </Box>
      <IconButton
        disableRipple={true}
        sx={{
          opacity: "0.4",
          transition: "all 0.3s",
          ":hover": {
            opacity: "1",
            transform: "scale(1.3)",
          },
          ":active": {
            transform: "scale(0.9)",
          },
        }}
      >
        <DropdownIcon />
      </IconButton>
    </Box>
  );
};

export default User;
