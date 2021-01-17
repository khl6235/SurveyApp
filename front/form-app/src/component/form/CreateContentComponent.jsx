import React, { Component } from "react";

import { Button, TableCell } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import { Table } from "@material-ui/core";

import MatchCreateContentComponent from "../form/MatchCreateContentComponent";
import Close from "@material-ui/icons/Close";

class CreateContentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
    };
  }

  childFunc = () => {
    this.props.func(this.state.contents);
  };

  addObjContent = () => {
    const { contents } = this.state;
    let nextId = 1;
    if (contents.length !== 0) {
      nextId = contents[contents.length - 1].id + 1;
    }
    const addObj = {
      id: nextId,
      contentType: "obj",
      contentInfo: null,
    };
    const newContents = [...this.state.contents, addObj];
    this.setState(
      {
        contents: newContents,
      },
      () => this.childFunc()
    );
  };

  addSubjContent = () => {
    const { contents } = this.state;
    let nextId = 1;
    if (contents.length !== 0) {
      nextId = contents[contents.length - 1].id + 1;
    }
    const addSubj = {
      id: nextId,
      contentType: "subj",
      contentInfo: null,
    };
    const newContents = [...this.state.contents, addSubj];
    this.setState(
      {
        contents: newContents,
      },
      () => this.childFunc()
    );
  };

  createContent = (id) => (contentInfo) => {
    const tempContents = this.state.contents.map((cont) => {
      if (cont.id === id) {
        cont.contentInfo = contentInfo;
      }
      return cont;
    });

    this.setState(
      {
        contents: tempContents,
      },
      () => this.childFunc()
    );
  };

  deleteContent = (id) => () => {
    const tempContents = this.state.contents.filter((cont) => {
      return cont.id !== id;
    });

    this.setState(
      {
        contents: tempContents,
      },
      () => this.childFunc()
    );
  };

  render() {
    return (
      <div style={formStyle}>
        {this.state.contents.map((cont) => (
          <MatchCreateContentComponent
            key={cont.id}
            func={this.createContent(cont.id)}
            delete={this.deleteContent(cont.id)}
            contentType={cont.contentType}
          ></MatchCreateContentComponent>
        ))}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <Button
            style={{ margin: "10px auto" }}
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<Add />}
            onClick={this.addObjContent}
          >
            객관식
          </Button>
          <Button
            style={{ margin: "10px auto" }}
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<Add />}
            onClick={this.addSubjContent}
          >
            주관식
          </Button>
        </div>
      </div>
    );
  }
}

const formStyle = {
  marginTop: "50px",
};

export default CreateContentComponent;
