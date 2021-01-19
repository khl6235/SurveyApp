import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Icon from "@material-ui/core/Icon";
import WebAsset from "@material-ui/icons/WebAsset";

const NavBar = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Icon edge="start" color="inherit">
            <WebAsset />
          </Icon>
          <Typography variant="h5" style={style}>
            Form Web
          </Typography>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const style = {
  flexGrow: 1,
  marginLeft: "10px",
};

export default NavBar;
