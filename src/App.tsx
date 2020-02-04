import React from "react";
import "./App.css";
import { Routes } from "./router/routes";

const App: React.FC = () => {
  let [navbarState, navbarHandle] = React.useState(false);
  const setHandle = () => {
    navbarHandle(!navbarState);
  };

  return (
    <Routes
      navbarState={navbarState}
      handleNavbar={setHandle}
      navigation={
        localStorage.authenticated === "false"
          ? {
              brand: { name: "Jetcake", to: "/" },
              links: [
                { name: "Log In", to: "/login" },
                { name: "Sign Up", to: "/signup" }
              ]
            }
          : {
              brand: { name: "Jetcake", to: "/" },
              links: [{ name: "Profile", to: "/profile" }]
            }
      }
    />
  );
};

export default App;
