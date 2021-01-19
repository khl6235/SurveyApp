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

  render() {
    return (
      <div>
        <Typography variant="h4" style={style}>
          Form List
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>FormIdx</TableCell>
              <TableCell>UserId</TableCell>
              <TableCell>title</TableCell>
              <TableCell>createdAt</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.forms.map((form) => (
              <TableRow key={form.formIdx}>
                <TableCell component="th" scope="form">
                  {form.formIdx}
                </TableCell>
                <TableCell>{form.userId}</TableCell>
                <TableCell>{form.title}</TableCell>
                <TableCell>{form.createdAt}</TableCell>
                <TableCell onClick={() => this.replyForm(form.formIdx)}>
                  <Button>응답하기</Button>
                </TableCell>
                <TableCell onClick={() => this.resultForm(form.formIdx)}>
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

export default FormListComponent;
