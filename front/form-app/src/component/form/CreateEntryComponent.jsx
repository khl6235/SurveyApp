import { Table } from "@material-ui/core";
import React, { Component } from "react";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Button, TextField } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";

class CreateEntryComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [],
    };
  }

  updateEntry = (id) => (e) => {
    const newEntry = e.target.value;
    const tempEntries = this.state.entries.map((ent) => {
      if (ent.id === id) {
        ent.entry = newEntry;
      }
      return ent;
    });

    this.setState(
      {
        entries: tempEntries,
      },
      () => console.log(this.state)
    );
  };

  addEntry = () => {
    const addEntry = {
      id: this.state.entries.length + 1,
      entry: "",
    };
    const newEntries = [...this.state.entries, addEntry];
    this.setState(
      {
        entries: newEntries,
      },
      () => console.log(this.state)
    );
  };

  deleteAllEntry = () => {
    this.setState({
      entries: [],
    });
  };

  deleteEntry = (id) => {
    const tempEntries = this.state.entries.filter((ent) => {
      return ent.id !== id;
    });

    this.setState(
      {
        entries: tempEntries,
      },
      () => console.log(this.state)
    );
  };

  render() {
    return (
      <div>
        {this.state.entries.length !== 0 && (
          <Table>
            <TableBody>
              {this.state.entries.map((ent) => (
                <TableRow key={ent.id + 1}>
                  <TableCell component="th" scope="ent">
                    <TextField
                      variant="standard"
                      placeholder="항목을 입력하세요"
                      fullWidth
                      onBlur={this.updateEntry(ent.id)}
                    ></TextField>
                  </TableCell>
                  <TableCell>
                    <Button
                      style={{ float: "right" }}
                      onClick={() => this.deleteEntry(ent.id)}
                    >
                      <Close />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <Button
          style={{ margin: "10px 0" }}
          color="primary"
          size="small"
          startIcon={<Add />}
          onClick={this.addEntry}
        >
          항목 추가
        </Button>

        <Button
          style={{ margin: "10px 0" }}
          color="primary"
          size="small"
          startIcon={<Close />}
          onClick={this.deleteAllEntry}
        >
          삭제
        </Button>
      </div>
    );
  }
}

export default CreateEntryComponent;
