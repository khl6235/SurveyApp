import React, {Component} from 'react';
import ApiService from "../../ApiService";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

class FormResultComponent extends Component{

    constructor(props){
        super(props);

        this.state = {
            formIdx: this.props.match.params.formIdx,
            form: {}
        }
    }

    componentDidMount(){
        this.loadFormDetail();
    }

    loadFormDetail = () =>{
        ApiService.formInfo(this.state.formIdx)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log('loadFormDetail error!', err.response);
        })
    }

    render(){
        return(
            <div>
                <Typography variant="h4" style={style}>Form Result</Typography>
                <Typography variant="h5">{this.state.formIdx}번 설문</Typography>
                
            </div>
        )
    }

}

const style={
    display: 'flex',
    justifyContent: 'center',
    margin: '40px auto'
}

export default FormResultComponent;