import React, { Component } from "react";

import { TextField } from "@material-ui/core";

class MatchCreateContentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      description: "",
      objEntry: this.props.contentTypeInfo.objEntry,
    };
  }

  createQuestion = (e) => {
    this.setState(
      {
        question: e.target.value,
      },
      () => console.log(this.state)
    );
  };

  createDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  createEntry = (e) => {
    this.setState(
      {
        objEntry: this.state.objEntry.push(e.target.value),
      },
      () => console.log(this.state)
    );
  };

  render() {
    const contentType = this.props.contentTypeInfo.contentType;
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

            {this.state.objEntry.map((entry) => {
              <TextField
                required
                fullWidth
                variant="standard"
                defaultValue={entry}
              ></TextField>;
            })}
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
