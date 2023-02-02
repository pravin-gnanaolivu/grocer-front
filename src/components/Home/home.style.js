import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

export const useLandingPageStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: 1400,
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  menuButton: {
    color: "white",
    zIndex: 9999,
    position: "fixed",
    left: "10px",
    top: "5px",
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    color: "#fff",
    fontSize: "1.2rem",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
  },
  filter: {
    //192b09
    backgroundImage: "linear-gradient(to right, #192b09, #00e3ae)",

    WebkitBackgroundClip: "text",

    // backgroundClip: "text",
    color: "transparent",
    fontSize: "1.1rem",
    backgroundClip: "text",
  },
}));
