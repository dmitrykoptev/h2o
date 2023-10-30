import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import ILink from "../../models/links";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuItem,
  MenuItemStylesParams,
  Sidebar,
  sidebarClasses,
} from "react-pro-sidebar";

interface IMySidebarProps {
  links: ILink[];
  active: string;
}

const myMenuItemStyles = {
  root: {
    padding: "1rem",
  },
  button: ({ active }: MenuItemStylesParams) => {
    return {
      color: "#fff",
      fontSize: "1.6rem",
      borderRadius: "1rem",
      transition: "all 0.4s",
      backgroundColor: active ? "rgba(255, 255, 255, 0.24)" : "transparent",
      ":hover": {
        backgroundColor: "rgba(255, 255, 255, 0.24)",
      },
    };
  },
  icon: {
    padding: "0.6rem",
    marginLeft: "-0.75rem",
  },
};

const MySidebar = ({ links, active }: IMySidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <Box className="removeRightBorder" display="flex" height="100vh">
      <Sidebar
        collapsed={isCollapsed}
        onMouseEnter={() => {
          setIsCollapsed(false);
        }}
        onMouseLeave={() => {
          setIsCollapsed(true);
        }}
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Box
          height="10rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Link to="/">
            <img
              src={logo}
              alt="H2O"
              style={{
                width: isCollapsed ? "5.4rem" : "8.1rem",
                height: isCollapsed ? "3rem" : "4.5rem",
                transition: "all 0.3s",
                cursor: "pointer",
              }}
            />
          </Link>
        </Box>
        <Menu
          menuItemStyles={myMenuItemStyles}
          style={{
            marginTop: "1rem",
          }}
        >
          {links.map((item) => (
            <MenuItem
              key={item.name}
              icon={item.icon}
              component={<Link to={item.link} />}
              active={item.link === active}
            >
              {item.name}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MySidebar;
