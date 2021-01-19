import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginComponent from "../user/LoginComponent";
import FormListComponent from "../form/FormListComponent";
import FormResultComponent from "../form/FormResultComponent";
import FormReplyComponent from "../form/FormReplyComponent";
import FormCreateComponent from "../form/FormCreateComponent";
import SignUpComponent from "../user/SignUpComponent";

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <div style={style}>
          <Switch>
            <Route exact path="/" component={LoginComponent} />
            <Route
              path="/forms/:formIdx/result"
              component={FormResultComponent}
            />
            <Route
              path="/forms/:formIdx/reply"
              component={FormReplyComponent}
            />
            <Route path="/forms/create" component={FormCreateComponent} />
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
