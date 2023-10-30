import React from "react";
import ILink from "../models/links";
import { ButtonGroup, IconButton, Tab, Tabs, useTheme } from "@mui/material";
import { ReactComponent as PreviousIcon } from "../assets/icons/previous.svg";
import { ReactComponent as NextIcon } from "../assets/icons/next.svg";
import { useNavigate } from "react-router-dom";

interface IHeaderNavigationProps {
  links: ILink[];
  active: string;
}

const iconButtonStyles = {
  width: "4rem",
  height: "4rem",
  transition: "all 0.3s",
  boxShadow: `0 4px 10px 2px #f1f1f1`,
  "& svg": { transition: "all 0.3s", opacity: "0.4" },
  ":hover": {
    "& svg": { opacity: "1" },
    transform: "scale(1.05)",
  },
  ":active": {
    transform: "scale(0.95)",
  },
};

const HeaderNavigation = ({ active, links }: IHeaderNavigationProps) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const moveTo = (direction: string) => {
    const currentIndex = links.findIndex((item) => item.link === active);

    if (direction === "previous") {
      if (currentIndex === 0) {
        navigate(`${links[links.length - 1].link}`);
      } else {
        navigate(`${links[currentIndex - 1].link}`);
      }
    }

    if (direction === "next") {
      if (currentIndex === links.length - 1) {
        navigate(`${links[0].link}`);
      } else {
        navigate(`${links[currentIndex + 1].link}`);
      }
    }
  };

  return (
    <nav
      style={{
        gridColumn: "span 2",
        display: "flex",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <ButtonGroup
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <IconButton
          disableRipple={true}
          sx={iconButtonStyles}
          onClick={() => {
            moveTo("previous");
          }}
        >
          <PreviousIcon style={{ marginLeft: "-0.4rem" }} />
        </IconButton>
        <IconButton
          disableRipple={true}
          sx={iconButtonStyles}
          onClick={() => {
            moveTo("next");
          }}
        >
          <NextIcon style={{ marginLeft: "0.4rem" }} />
        </IconButton>
      </ButtonGroup>
      <Tabs
        value={active}
        textColor="secondary"
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons={false}
        aria-label="basic tabs example"
        sx={{
          position: "relative",
          paddingBottom: "2px",
          "&::after": {
            content: '""',
            height: "1px",
            width: "100%",
            position: "absolute",
            bottom: "3px",
            backgroundColor: theme.palette.secondary.light,
          },
          "& .Mui-selected": {
            color: `${theme.palette.secondary.dark} !important`,
          },
          "& .MuiTabs-indicator": {
            height: "0.3rem",
            borderRadius: "1rem",
            zIndex: "2",
          },
        }}
      >
        {links.map((item) => (
          <Tab
            key={item.name}
            value={item.link}
            label={item.name}
            disableRipple={true}
            sx={{
              fontSize: "1.6rem",
              textTransform: "capitalize",
              color: `${theme.palette.secondary.light}`,
            }}
            onClick={() => {
              navigate(`${item.link}`);
            }}
          />
        ))}
      </Tabs>
    </nav>
  );
};

export default HeaderNavigation;
