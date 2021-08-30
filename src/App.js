import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import NotFound from "./components/common/NotFound";
import Logout from "./components/logout/Logout";
import ProtectedRoute from "./route/ProtectedRoute";
import { Home, Register, Detail, Write } from "./route/routeList";
import UserContext from "./context/UserContext";
import auth from "./services/authService";

function App(props) {
  const [user, setUser] = useState();

  // 获取用户信息
  useEffect(() => {
    const user = auth.getCurrentUser();
    setUser(user);
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      <Switch>
        <Route path="/articles/:id" component={Detail} />
        <Route path="/search" component={Home} />
        <Route path="/tags" component={Home} />
        <Route path="/logout" component={Logout} />
        <ProtectedRoute path="/write" component={Write} />
        <Route path="/sign-up" component={Register} />
        <Route path="/not-found" component={NotFound} />
        <Route path="/" exact component={Home} />
        <Redirect to="/not-found" />
      </Switch>
    </UserContext.Provider>
  );
}

export default App;
