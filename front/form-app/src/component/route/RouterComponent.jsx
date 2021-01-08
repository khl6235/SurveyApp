import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import FormListComponent from "../form/FormListComponent";

const AppRouter = () => {
    return(
        <div>
            <BrowserRouter>
            <div style={style}>
                <Switch>
                    <Route exact path="/" component={FormListComponent}/>
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