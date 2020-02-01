import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar } from "../components";
import LoginPage from "../pages/LoginPage/Login";
import { INavProps } from "../pages/types";
import WelcomePage from "../pages/WelcomePage/Welcome";
import SignUp from "../pages/SignUpPage/SignUp";

const navigation = {
  brand: { name: "Jetcake", to: "/" },
  links: [
    { name: "Log In", to: "/login" },
    { name: "Sign Up", to: "/signup" }
  ]
};

export const Routes: React.FC<INavProps> = ({ navbarState, handleNavbar }) => {
  const { brand, links } = navigation;
  return (
    <BrowserRouter>
      <div>
        <Navbar
          navbarState={navbarState}
          handleNavbar={handleNavbar}
          brand={brand}
          links={links}
        />
        <Switch>
          <Route path="/" exact={true} component={WelcomePage} />
          <Route path="/login" exact={true} component={LoginPage} />
          <Route path="/signup" exact={true} component={SignUp} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
