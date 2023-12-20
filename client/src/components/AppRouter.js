import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import Shop from "../pages/Shop";
import { Context } from "../index";

const AppRouter = () => {
  const { user } = useContext(Context);
  return (
    <div>
      <Routes>
        {user.isAuth &&
          authRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} Component={Component} exact />
          ))}
        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} Component={Component} exact />
        ))}
        <Route path="/*" Component={Shop} />
      </Routes>
    </div>
  );
};

export default AppRouter;
