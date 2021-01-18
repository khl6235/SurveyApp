import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import FormListComponent from "../form/FormListComponent";
import LoginComponent from "../user/LoginComponent";
import SignUpComponent from "../user/SignUpComponent";

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <div style={style}>
          <Switch>
            <Route exact path="/" component={LoginComponent} />
            <Route path="/forms" component={FormListComponent} />
            <Route path="/signup" component={SignUpComponent} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

const style = {
  marginTop: "20px",
};

export default AppRouter;
