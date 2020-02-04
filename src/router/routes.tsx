import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar } from "../components";
import LoginPage from "../pages/LoginPage/Login";
import { INavProps } from "../pages/types";
import WelcomePage from "../pages/WelcomePage/Welcome";
import SignUp from "../pages/SignUpPage/SignUp";
import Home from "../pages/HomePage/Home";
import Profile from "../pages/ProfilePage/Profile";
import { Footer } from "../components/Footer/Footer";

export const Routes: React.FC<INavProps> = ({
  navbarState,
  handleNavbar,
  navigation
}) => {
  const { brand, links } = navigation;
  return (
    <BrowserRouter forceRefresh={true}>
      <div>
        <Navbar
          navigation={navigation}
          navbarState={navbarState}
          handleNavbar={handleNavbar}
          brand={brand}
          links={links}
        />
        <Switch>
          <Route path="/" exact={true} component={WelcomePage} />
          <Route path="/home" exact={true} component={Home} />
          <Route path="/login" exact={true} component={LoginPage} />
          <Route path="/signup" exact={true} component={SignUp} />
          <Route path="/profile" exact={true} component={Profile} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
