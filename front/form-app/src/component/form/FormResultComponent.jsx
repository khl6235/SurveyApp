import React, {Component} from 'react';
import ApiService from "../../ApiService";

import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

import ContentComponent from "../form/ContentComponent";

class FormResultComponent extends Component{

    constructor(props){
        super(props);

        this.state = {
            formIdx: this.props.match.params.formIdx,
            formInfo: [],
            contentInfo:[],
        }
    }

    componentDidMount(){
        this.loadFormDetail();
    }

    loadFormDetail = () =>{
        ApiService.formInfo(this.state.formIdx)
        .then(res => {
            this.setState({
                formInfo: res.data.formInfo,
                contentInfo: res.data.contentInfo
            });
        })
        .catch(err => {
            console.log('loadFormDetail error!', err.response);
        })
    }
    goToList = () =>{
        this.props.history.push('/forms');
    }

    render(){
        return(
            <div>
                <Typography variant="h4" style={style}>Form Result</Typography>
                
                <form style={formResultContainer}>
                    <Button style={goToListStyle} color="primary" onClick={this.goToList}>목록으로</Button>
                    <Typography style={{fontWeight:600}} variant="h5">{this.state.formInfo.title}</Typography>
                    <Typography style={{marginTop: '10px'}} color="textSecondary" variant="body1">{this.state.formInfo.userId} | {this.state.formInfo.createdAt}</Typography>
                    <div style={{margin: '10px 15px'}}>
                        {this.state.contentInfo.map(content => {
                            return(<ContentComponent key={content.contentDetail.contentIdx} contentInfo = {content}></ContentComponent>);
                        })}
                    </div>
                </form>
                
                
            </div>
        )
    }

}

const style={
    display: 'flex',
    justifyContent: 'center',
    margin: '40px 80px'
}

const goToListStyle={
    float: 'right'
}

const formResultContainer={
    margin: '40px 240px'
}

export default FormResultComponent;