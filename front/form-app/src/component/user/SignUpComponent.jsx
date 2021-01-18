import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import ApiService from "../../ApiService";

class SignUpComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      password: "",
      passwordCheck: "",
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  signUp = () => {
    const { id, password, passwordCheck } = this.state;
    if (id !== "" && password !== "" && passwordCheck !== "") {
      if (password === passwordCheck) {
        const user = { id, password };
        ApiService.signup(user)
          .then((res) => {
            if (res.data === false) {
              alert("이미 존재하는 아이디입니다.");
            } else {
              this.props.history.push("/");
            }
          })
          .catch((err) => {
            console.log("SignUp error!", err.response);
          });
      }
    }
  };

  render() {
    return (
      <div style={style}>
        <Typography variant="h4" style={style2}>
          SIGN UP
        </Typography>

        <form style={signupContainer}>
          <TextField
            type="text"
            placeholder="ID"
            fullWidth
            margin="normal"
            value={this.state.id}
            name="id"
            onChange={this.onChange}
          />

          <TextField
            type="password"
            placeholder="PASSWORD"
            fullWidth
            margin="normal"
            value={this.state.password}
            name="password"
            onChange={this.onChange}
          />

          <TextField
            error={
              this.state.password === this.state.passwordCheck ? false : true
            }
            type="password"
            placeholder="PASSWORD CHECK"
            fullWidth
            margin="normal"
            name="passwordCheck"
            onChange={this.onChange}
          />

          <Button
            style={{ margin: "20px 0" }}
            variant="contained"
            color="primary"
            onClick={this.signUp}
          >
            sign up
          </Button>
        </form>
      </div>
    );
  }
}

const style = {
  width: "300px",
  margin: "0 auto",
};

const style2 = {
  marginTop: "60px",
  display: "flex",
  justifyContent: "center",
};

const signupContainer = {
  marginTop: "50px",
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "center",
};

export default SignUpComponent;
