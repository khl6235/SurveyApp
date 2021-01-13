import React, { Component } from "react";

import Typography from "@material-ui/core/Typography";

import MatchContentComponent from "../form/MatchContentComponent";

class ReplyContentComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reply: {},
    };
  }

  replyResult = (replyInfo) => {
    this.state.reply = replyInfo;
    this.props.func(this.state.reply);
  };

  render() {
    return (
      <div style={contentStyle}>
        <Typography style={{ fontWeight: 600 }} variant="h6">
          {this.props.contentInfo.contentDetail.question}
        </Typography>
        <Typography
          style={{ marginTop: "7px", marginBottom: "15px" }}
          variant="body2"
        >
          {this.props.contentInfo.contentDetail.description}
        </Typography>
        <MatchContentComponent
          contentInfo={this.props.contentInfo}
          func={this.replyResult}
        ></MatchContentComponent>
      </div>
    );
  }
}

const contentStyle = {
  margin: "40px 0",
};

export default ReplyContentComponent;
