import React, {Component} from 'react';
import ApiService from '../../ApiService';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';

class LoginComponent extends Component{
                                                                                                                                                                                                                                                                                                                              
    constructor(props){
        super(props);

        this.state = {
            userIdx: '',
            id: '',
            password: ''
        };
    }

    onChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    logIn = (e) => {
        e.preventDefault();

        let user = {
            userIdx: this.state.userIdx,
            id: this.state.id,
            password: this.state.password
        }

        if(this.state.id.length > 0 && this.state.password.length > 0){
            ApiService.login(user)
            .then(res => {
                console.log(res.data);
                if(res && res.data){
                    this.setState({
                        userIdx: res.data.userIdx,
                        id: res.data.id,
                        password: res.data.password
                    })
                    this.props.history.push('/forms');
                }
                else{
                    alert('존재하지 않는 사용자입니다.');
                }
                
            })
            .catch(err => {
                console.log("login error!", err.response);
            })            
        }
        else{
            alert('정보를 입력해주세요.');
        }
    }

    render(){
        return(
            <div style={style}>
                <Typography variant="h4"  style={style2}>LOGIN</Typography>
                <form style={loginContainer}>
                    <TextField type="text" placeholder="ID" fullWidth margin="normal" 
                    value={this.state.id} name="id" onChange={this.onChange}/>
                    
                    <TextField type="password" placeholder="PASSWORD" fullWidth margin="normal" 
                    value={this.state.password} name="password" onChange={this.onChange}/>

                    <Button variant="contained" color="primary" onClick={this.logIn}>login</Button>
                </form>
            </div>
        );
    }
}

const style = {
    width: '300px',
    margin: '0 auto'
}

const style2={
    marginTop: '60px',
    display: 'flex',
    justifyContent: 'center'
}

const loginContainer = {
    marginTop: '50px',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
    
}

export default LoginComponent;