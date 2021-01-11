import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import FormListComponent from "../form/FormListComponent";
import LoginComponent from "../user/LoginComponent";
import FormResultComponent from "../form/FormResultComponent";

const AppRouter = () => {
    return(
        <div>
            <BrowserRouter>
            <div style={style}>
                <Switch>
                    <Route exact path="/" component={LoginComponent}/>
                    <Route path="/forms/:formIdx" component={FormResultComponent}/>
                    <Route path="/forms" component={FormListComponent}/>
                    
                </Switch>
            </div>
            </BrowserRouter>
        </div>
    );
}

const style = {
    marginTop: '20px'
}

export default AppRouter;