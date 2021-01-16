import React, { Component } from "react";

import Typography from "@material-ui/core/Typography";
import { Button, TextField } from "@material-ui/core";

import CreateContentComponent from "../form/CreateContentComponent";

class FormCreateComponent extends Component {
  constructor(props) {
    super(props);
  }

  goToList = () => {
    this.props.history.push("/forms");
  };

  render() {
    return (
      <div>
        <Typography variant="h4" style={style}>
          Create Form
        </Typography>

        <form style={formCreateContainer}>
          <Button style={goToListStyle} color="primary" onClick={this.goToList}>
            목록으로
          </Button>
          <div style={{ margin: "0 50px" }}>
            <TextField
              style={{ fontWeight: 600 }}
              variant="standard"
              fullWidth
              label="설문 제목을 입력하세요"
            ></TextField>
            <div style={{ margin: "10px 15px" }}>
              <CreateContentComponent></CreateContentComponent>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "50px 0",
            }}
          >
            <Button variant="contained" color="primary" size="large">
              Create
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const style = {
  display: "flex",
  justifyContent: "center",
  margin: "40px 80px",
};

const goToListStyle = {
  float: "right",
};

const formCreateContainer = {
  margin: "40px 240px",
};

export default FormCreateComponent;
