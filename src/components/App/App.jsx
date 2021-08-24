import React from "react";
import Authorization from "../Authorization/Authorization";
import Main from "../Main/Main";
import {Router, Route, Switch} from "react-router-dom";
import history from "../../history";
import Error from "../Error/Error";
import PageNotFound from "../PageNotFound/PageNotFound";

const App = () => {

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <Main/>
        </Route>
        <Route exact path="/auth">
          <Authorization/>
        </Route>
        <Route exact path="/error">
          <Error/>
        </Route>
        <Route>
          <PageNotFound/>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
