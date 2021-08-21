import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import Detail from "./components/detail/Detail";
import NotFound from "./components/common/NotFound";

function App(props) {
  return (
    <Switch>
      <Route path="/articles/:id" component={Detail} />
      <Route path="/not-found" component={NotFound} />
      <Route path="/" exact component={Home} />
      <Redirect to="/not-found" />
    </Switch>
  );
}

export default App;
