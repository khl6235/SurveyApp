import React, {Component} from 'react';
import ApiService from "../../ApiService";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

class FormListComponent extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            forms: [],
            message: null
        }
    }

    componentDidMount(){
        this.loadFormList();
    }

    loadFormList = () => {
        ApiService.formList()
        .then(res => {
            this.setState({
                forms: res.data
            })
        })
        .catch(err => {
            console.log("loadFormList error!", err);
        })
    }

    readForm = (formIdx) => {
        this.props.history.push(`/forms/${formIdx}`);
    }

    render(){
        return(
            <div>
                <Typography variant="h4" style={style}>Form List</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>FormIdx</TableCell>
                            <TableCell>UserIdx</TableCell>
                            <TableCell>title</TableCell>
                            <TableCell>createdAt</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.forms.map(form=>
                            <TableRow onClick={() => this.readForm(form.formIdx)} key={form.formIdx}>
                                <TableCell component="th" scope="form">{form.formIdx}</TableCell>
                                <TableCell>{form.userIdx}</TableCell>
                                <TableCell>{form.title}</TableCell>
                                <TableCell>{form.createdAt}</TableCell>
                            </TableRow>
                            )}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

const style={
    display: 'flex',
    justifyContent: 'center',
    margin: '40px auto'
}

export default FormListComponent;