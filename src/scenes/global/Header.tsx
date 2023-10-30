import React from "react";
import ILink from "../../models/links";
import HeaderNavigation from "../../components/HeaderNavigation";
import User from "../../components/User";

interface IHeaderProps {
  links: ILink[];
  active: string;
}

const Header = ({ links, active }: IHeaderProps) => {
  return (
    <header
      style={{
        height: "10rem",
        width: "100%",
        padding: "0 4rem",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: "4rem",
        alignContent: "center",
      }}
    >
      <HeaderNavigation active={active} links={links} />
      <User />
    </header>
  );
};

export default Header;
