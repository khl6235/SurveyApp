import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Icon from "@material-ui/core/Icon";
import WebAsset from "@material-ui/icons/WebAsset";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
    };
  }

  // componentDidMount(){
  //   const nowProfile = window.sessionStorage.id === null ? null : "Logout";
  //   this.setState({
  //     profile: nowProfile
  //   });
  // }

  profileClick = (e) => {
    if (this.state.profile === "Logout") {
      window.sessionStorage.clear();
      this.setState({
        profile: null,
      });
    }
  };

  render() {
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
            <Button color="inherit">
              <AccountCircle style={{ marginRight: "5px" }} />
              {this.state.profile}
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}


const style = {
  flexGrow: 1,
  marginLeft: "10px",
};

export default NavBar;
