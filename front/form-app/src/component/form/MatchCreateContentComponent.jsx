import React, { Component } from "react";

import { Button, TextField } from "@material-ui/core";
import Close from "@material-ui/icons/Close";

import CreateEntryComponent from "../form/CreateEntryComponent";

class MatchCreateContentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      description: "",
      objEntry: [],
    };
  }

  childFunc = () => {
    this.props.func(this.state);
  };

  createQuestion = (e) => {
    this.setState(
      {
        question: e.target.value,
        objEntry: null
      },
      () => this.childFunc()
    );
  };

  createDescription = (e) => {
    this.setState(
      {
        description: e.target.value,
      },
      () => this.childFunc()
    );
  };

  createEntry = (entries) => {
    this.state.objEntry = entries;
    this.childFunc();
  };

  deleteContent = () => {
    this.props.delete(this.state);
  };

  render() {
    const contentType = this.props.contentType;
    if (contentType !== null) {
      if (contentType === "obj") {
        return (
          <div style={contentStyle}>
            <Button
              style={{ margin: "10px 0", float: "right" }}
              color="primary"
              size="large"
              onClick={this.deleteContent}
            >
              <Close />
            </Button>
            <div style={eachContent}>
              <TextField
                style={question}
                variant="standard"
                fullWidth
                placeholder="객관식 질문을 입력하세요"
                onBlur={this.createQuestion}
              ></TextField>

              <TextField
                style={description}
                variant="standard"
                fullWidth
                placeholder="설명을 입력하세요"
                size="small"
                onBlur={this.createDescription}
              ></TextField>

              <CreateEntryComponent
                func={this.createEntry}
              ></CreateEntryComponent>
            </div>
          </div>
        );
      } else if (contentType === "subj") {
        return (
          <div style={contentStyle}>
            <Button
              style={{ margin: "10px 0", float: "right" }}
              color="primary"
              size="large"
              onClick={this.deleteContent}
            >
              <Close />
            </Button>
            <div style={eachContent}>
              <TextField
                style={question}
                variant="standard"
                fullWidth
                placeholder="주관식 질문을 입력하세요"
                onBlur={this.createQuestion}
              ></TextField>

              <TextField
                style={description}
                variant="standard"
                fullWidth
                placeholder="설명을 입력하세요"
                size="small"
                onBlur={this.createDescription}
              ></TextField>
            </div>
          </div>
        );
      }
    } else {
      return;
    }
  }
}

const contentStyle = {
  margin: "40px 0",
};

const eachContent = {
  margin: "0 20px",
};

const question = {
  fontWeight: 400,
  marginBottom: "23px",
};

const description = {
  fontWeight: 200,
  marginBottom: "15px",
};

export default MatchCreateContentComponent;
