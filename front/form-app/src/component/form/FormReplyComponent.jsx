import React, { Component } from "react";
import ApiService from "../../ApiService";

import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

import ReplyContentComponent from "../form/ReplyContentComponent";

class FormReplyComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formIdx: this.props.match.params.formIdx,
      formInfo: [],
      contentInfo: [],
      replyInfo: [],
    };
  }

  componentDidMount() {
    this.loadFormDetail();
  }

  loadFormDetail = () => {
    ApiService.formInfo(this.state.formIdx)
      .then((res) => {
        this.setState({
          formInfo: res.data.formInfo,
          contentInfo: res.data.contentInfo,
        });
      })
      .catch((err) => {
        console.log("loadFormDetail error!", err.response);
      });
  };

  goToList = () => {
    this.props.history.push("/forms");
  };

  replyResult = (reply) => {
    const replyInfo = this.state.replyInfo;
    const targetIdx = replyInfo.findIndex(
      (result) => result.contentIdx === reply.contentIdx
    );
    if (targetIdx !== -1) {
      replyInfo.splice(targetIdx, 1, reply);
    } else {
      replyInfo.push(reply);
    }
  };

  submit = () => {
    this.state.replyInfo.forEach((content) => {
      content.userIdx = 3;
      ApiService.contentReply(content.contentIdx, content)
        .then((res) => {
          this.props.history.push("/forms");
        })
        .catch((err) => {
          console.log("contentReply error!", err.response);
        });
    });
  };

  render() {
    return (
      <div>
        <Typography variant="h4" style={style}>
          Form Reply
        </Typography>

        <form style={formReplyContainer}>
          <Button style={goToListStyle} color="primary" onClick={this.goToList}>
            목록으로
          </Button>
          <Typography style={{ fontWeight: 600 }} variant="h5">
            {this.state.formInfo.title}
          </Typography>
          <Typography
            style={{ marginTop: "10px" }}
            color="textSecondary"
            variant="body1"
          >
            {this.state.formInfo.userId} | {this.state.formInfo.createdAt}
          </Typography>
          <div style={{ margin: "10px 15px" }}>
            {this.state.contentInfo.map((content) => {
              return (
                <ReplyContentComponent
                  key={content.contentDetail.contentIdx}
                  contentInfo={content}
                  func={this.replyResult}
                ></ReplyContentComponent>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" color="primary" onClick={this.submit}>
              Submit
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

const formReplyContainer = {
  margin: "40px 240px",
};

export default FormReplyComponent;
