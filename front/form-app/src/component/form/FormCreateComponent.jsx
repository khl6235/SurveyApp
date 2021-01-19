import React, { Component } from "react";

import Typography from "@material-ui/core/Typography";
import { Button, TextField } from "@material-ui/core";

import CreateContentComponent from "../form/CreateContentComponent";
import ApiService from "../../ApiService";

class FormCreateComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      userId: "khl6235", //window.sessionStorage.getItem("id");
      contents: [],
    };
  }

  goToList = () => {
    this.props.history.push("/forms");
  };

  setTitle = (e) => {
    this.setState({
      title: e.target.value
    });
  }

  createForm = (contents) => {
    this.setState({
      contents: contents,
    });
  };

  create = () => {
    let alertType = 0;
    if (this.state.contents.length === 0) alertType = 1;
    else {
      this.state.contents.forEach((cont) => {
        let flag = false;

        if (cont.contentInfo !== null) {
          const contentInfo = cont.contentInfo;
          if (contentInfo.question.length !== 0) {
            

            if (cont.contentType === "obj") {
              const objEntry = contentInfo.objEntry;
              if (objEntry.entries.length !== 0) {
                objEntry.entries.some((ent) => {
                  if (ent.entry.length === 0) {
                    flag = false;
                    alertType = 3;
                  } else {
                    flag = true;
                  }
                });
              } else {
                alertType = 4;
              }
            } else if (cont.contentType === "subj") {
              flag = true;
            }
          } else {
            alertType = 2;
          }
        } else {
          alertType = 1;
        }
      });
    }

    switch (alertType) {
      case 0:
        console.log(this.state);
        ApiService.contentForm(this.state)
        .then((res) => {
          this.props.history.push("/forms");
        })
        .catch((err) => {
          console.log("contentCreate error!", err.response);
        });
        break;
      case 1:
        alert("설문 내용을 작성해주세요.");
        break;
      case 2:
        alert("모든 문항의 질문을 작성해주세요.");
        break;
      case 3:
        alert("객관식 문항의 선택지를 작성해주세요.");
        break;
      case 4:
        alert("객관식 문항은 선택지가 필요합니다.");
        break;
      default:
        break;
    }

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
              onBlur={this.setTitle}
            ></TextField>
            <div style={{ margin: "10px 15px" }}>
              <CreateContentComponent
                func={this.createForm}
              ></CreateContentComponent>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "50px 0",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={this.create}
            >
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
