import React, { Component } from "react";
import ApiService from "../../ApiService";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class FormListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forms: [],
      message: null,
    };
  }

  componentDidMount() {
    this.loadFormList();
  }

  loadFormList = () => {
    ApiService.formList()
      .then((res) => {
        this.setState({
          forms: res.data,
        });
      })
      .catch((err) => {
        console.log("loadFormList error!", err);
      });
  };

  resultForm = (formIdx) => {
    this.props.history.push(`/forms/${formIdx}/result`);
  };

  replyForm = (formIdx) => {
    this.props.history.push(`/forms/${formIdx}/reply`);
  };

  createForm = () => {
    this.props.history.push(`/forms/create`);
  };

  logout = () => {
    window.sessionStorage.clear();
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <Typography variant="h4" style={style}>
          Form List
        </Typography>
        <div
          style={{ float: "right", marginRight: "85px", marginBottom: "20px" }}
        >
          <Button style={{ marginRight: "40px" }} onClick={this.createForm}>
            설문 생성
          </Button>
          <Button onClick={this.logout}>로그아웃</Button>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={boldText}>WRITER</TableCell>
              <TableCell style={boldText}>CREATED AT</TableCell>
              <TableCell style={boldText}>TITLE</TableCell>
              <TableCell style={boldText} align="center">
                REPLY
              </TableCell>
              <TableCell style={boldText} align="center">
                RESULT
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.forms.map((form) => (
              <TableRow key={form.formIdx}>
                <TableCell component="th" scope="form">
                  {form.userId}
                </TableCell>
                <TableCell>{form.createdAt}</TableCell>
                <TableCell>{form.title}</TableCell>
                <TableCell
                  onClick={() => this.replyForm(form.formIdx)}
                  align="center"
                >
                  <Button>응답하기</Button>
                </TableCell>
                <TableCell
                  onClick={() => this.resultForm(form.formIdx)}
                  align="center"
                >
                  <Button>결과 조회</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}
const style = {
  display: "flex",
  justifyContent: "center",
  margin: "40px auto",
};
const boldText = {
  fontWeight: "bold",
};

export default FormListComponent;
