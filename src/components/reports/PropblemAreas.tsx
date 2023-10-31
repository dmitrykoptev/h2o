import React from "react";
import { ReactComponent as WarningRedIcon } from "../../assets/icons/warningRed.svg";
import { ReactComponent as WarningYellowIcon } from "../../assets/icons/warningYellow.svg";
import { IPurposeExpenses } from "../../scenes/Reports";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { numberTransform } from "../../mock/dataTransformer";

interface IProblemAreasProps {
  list: IPurposeExpenses[];
}

const PropblemAreas = ({ list }: IProblemAreasProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ height: "100%", position: "relative" }}>
      <Box
        sx={{
          height: "100%",
          padding: "3rem 3.2rem",
          display: "flex",
          flexDirection: "column",
          "::before": {
            content: '""',
            position: "absolute",
            top: "6rem",
            left: 0,
            right: 0,
            height: "10px",
            background: "rgba(255, 255, 255, 1)",
            filter: "blur(2px)",
            zIndex: 2,
          },
          "::after": {
            content: '""',
            position: "absolute",
            bottom: "2.3rem",
            left: 0,
            right: 0,
            height: "10px",
            background: "rgba(255, 255, 255, 1)",
            filter: "blur(2px)",
            zIndex: 2,
          },
        }}
      >
        <Typography
          variant="h2"
          fontWeight={700}
          color={theme.palette.secondary.dark}
          mb="1rem"
        >
          Проблемные зоны
        </Typography>

        <List
          sx={{
            overflow: "scroll",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.3rem",
          }}
        >
          {list.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                gap: "1.6rem",
                padding: 0,
                "& svg": {
                  height: "3rem",
                  width: "3rem",
                },
              }}
            >
              {item.sum > 50000 ? <WarningRedIcon /> : <WarningYellowIcon />}
              <ListItemText
                primary={
                  <Typography
                    variant="h5"
                    fontWeight={500}
                    color={theme.palette.secondary.main}
                  >
                    {item.name}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="h3"
                    fontWeight={700}
                    color={theme.palette.secondary.dark}
                  >
                    ₽ {numberTransform(item.sum)}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default PropblemAreas;
