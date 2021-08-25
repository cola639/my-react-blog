import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";

function ProtectedRoute({ path, component: Component, render, ...rest }) {
  const userContext = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!userContext.user)
          return (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          );

        if (!userContext.user.isAdmin || !userContext.user.isAdmin)
          return (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          );

        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
}

export default ProtectedRoute;
