import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import history from "../history";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";
import Badge from "@material-ui/core/Badge";
import { itemTotal } from "../helpers/cartHelpers";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    marginRight: "20px",
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "linear-gradient(to bottom right, #9be15d, #00e3ae)",
  },
}));

const Appbar = () => {
  const classes = useStyles();
  const [route, setRoute] = useState("");
  const { user } = isAuthenticated();

  useEffect(() => {
    if (user && user.role === 1) {
      setRoute("/admin/dashboard");
    } else {
      setRoute("/user/dashboard");
    }
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Link
            style={{
              textDecoration: "none",
              color: "#fff",
              marginLeft: "23px",
            }}
            to="/"
          >
            <h1>grocer</h1>
          </Link>
          <div style={{ display: "flex", flexGrow: "1" }} />
          <Link to="/cart">
            <StyledBadge badgeContent={itemTotal()} color="secondary">
              <ShoppingCartIcon className="cart_style" />
            </StyledBadge>
          </Link>

          {isAuthenticated() && (
            <div style={{ display: "flex" }}>
              <PersonIcon
                onClick={() => history.push(route)}
                className="my_account"
              />
              <div style={{ fontSize: "1.1rem" }}>
                <span
                  onClick={() =>
                    signout(() => {
                      history.push("/");
                    })
                  }
                  style={{ cursor: "pointer" }}
                >
                  <h1 className="logoutBtn">logout</h1>
                </span>
              </div>
            </div>
          )}

          {!isAuthenticated() && (
            <Link to="/Signin">
              <h1 className="logoutBtn">login</h1>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Appbar;
