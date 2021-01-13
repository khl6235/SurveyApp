import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import { FormControl, RadioGroup, FormControlLabel } from "@material-ui/core";

class MatchContentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentIdx: this.props.contentInfo.contentDetail.contentIdx,
      objReply: 0,
      subjReply: null,
    };
  }

  childFunc = () => {
    let replyInfo = this.state;
    this.props.func(replyInfo);
  };

  subjChange = (e) => {
    this.setState(
      {
        subjReply: e.target.value,
      },
      () => this.childFunc()
    );
  };

  objChange = (e) => {
    this.setState(
      {
        objReply: e.target.value,
      },
      () => this.childFunc()
    );
  };

  radioChecked = (ent) => {
    if (this.state.objReply == ent.entryIdx) {
      return true;
    } else return false;
  };

  render() {
    if (this.props.contentInfo.objResultDetail === null) {
      return (
        <TextField
          variant="filled"
          fullWidth
          label="답변을 입력하세요"
          onBlur={this.subjChange}
        ></TextField>
      );
    } else {
      return (
        <FormControl>
          <RadioGroup value={this.state.objReply} onChange={this.objChange}>
            {this.props.contentInfo.entryDetail.map((ent) => (
              <FormControlLabel
                checked={this.radioChecked(ent)}
                value={ent.entryIdx}
                control={<Radio color="primary" />}
                label={ent.entry}
                key={ent.entryIdx}
              />
            ))}
          </RadioGroup>
        </FormControl>
      );
    }
  }
}

export default MatchContentComponent;
