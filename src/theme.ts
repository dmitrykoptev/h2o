import { Theme, createTheme } from "@mui/material";

const customTheme: Theme = createTheme({
  palette: {
    primary: {
      main: "#54D3C2",
      dark: "#30898A",
    },
    secondary: {
      light: "#D2D1D1",
      main: "#6D7986",
      dark: "#323F47",
    },
    warning: {
      main: "#FC5C65",
      light: "#F7B731",
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(", "),
    fontSize: 14,
    h1: {
      fontFamily: ["Roboto", "sans-serif"].join(", "),
      fontSize: "2.8rem",
    },
    h2: {
      fontFamily: ["Roboto", "sans-serif"].join(", "),
      fontSize: "2rem",
    },
    h3: {
      fontFamily: ["Roboto", "sans-serif"].join(", "),
      fontSize: "1.8rem",
    },
    h4: {
      fontFamily: ["Roboto", "sans-serif"].join(", "),
      fontSize: "1.6rem",
    },
    h5: {
      fontFamily: ["Roboto", "sans-serif"].join(", "),
      fontSize: "1.4rem",
    },
    h6: {
      fontFamily: ["Roboto", "sans-serif"].join(", "),
      fontSize: "1.2rem",
    },
  },
});

export default customTheme;
