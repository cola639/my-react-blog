import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../services/authService";

function ProtectedRoute({ path, component: Component, render, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.getCurrentPower())
          return Component ? <Component {...props} /> : render(props);
        return (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        );
      }}
    />
  );
}

export default ProtectedRoute;
