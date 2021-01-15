import React, { Component } from "react";

import { TextField } from "@material-ui/core";

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

  createQuestion = (e) => {
    this.setState({
      question: e.target.value,
    });
  };

  createDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  createEntry = (newEntry) => {
    const objEntry = this.state.objEntry;
    const newIdx = this.state.objEntry.length;
    objEntry.push({
      idx: newIdx,
      entry: newEntry,
    });
    console.log(objEntry);
  };

  render() {
    const contentType = this.props.contentType;
    if (contentType !== null) {
      if (contentType === "obj") {
        return (
          <div>
            <TextField
              style={{ fontWeight: 400 }}
              variant="standard"
              fullWidth
              placeholder="객관식 질문을 입력하세요"
              onBlur={this.createQuestion}
            ></TextField>

            <TextField
              style={{ fontWeight: 200 }}
              variant="standard"
              fullWidth
              placeholder="설명을 입력하세요"
              size="small"
              onBlur={this.createDescription}
            ></TextField>

            <CreateEntryComponent
              createEntry={this.createEntry}
            ></CreateEntryComponent>
          </div>
        );
      } else if (contentType === "subj") {
        return (
          <div>
            <TextField
              style={{ fontWeight: 400 }}
              variant="standard"
              fullWidth
              placeholder="주관식 질문을 입력하세요"
              onBlur={this.createQuestion}
            ></TextField>

            <TextField
              style={{ fontWeight: 200 }}
              variant="standard"
              fullWidth
              placeholder="설명을 입력하세요"
              size="small"
              onBlur={this.createDescription}
            ></TextField>
          </div>
        );
      }
    } else {
      return <div></div>;
    }
  }
}

export default MatchCreateContentComponent;
