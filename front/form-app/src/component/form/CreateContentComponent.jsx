import React, { Component } from "react";

import { Button } from "@material-ui/core";
import Add from "@material-ui/icons/Add";

import MatchCreateContentComponent from "../form/MatchCreateContentComponent";

class CreateContentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentType: null,
    };
  }

  clickObj = () => {
    this.setState({
      contentType: "obj",
    });
  };

  clickSubj = () => {
    this.setState({
      contentType: "subj",
      objEntry: null,
    });
  };

  render() {
    return (
      <div>
        <div>
          <MatchCreateContentComponent
            contentType={this.state.contentType}
          ></MatchCreateContentComponent>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{ margin: "10px auto" }}
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<Add />}
            onClick={this.clickObj}
          >
            객관식
          </Button>
          <Button
            style={{ margin: "10px auto" }}
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<Add />}
            onClick={this.clickSubj}
          >
            주관식
          </Button>
        </div>
      </div>
    );
  }
}

export default CreateContentComponent;
