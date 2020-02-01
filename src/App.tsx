import React from 'react';
import './App.css';
import { Routes } from './router/routes';


const App: React.FC = () => {
  let [navbarState, navbarHandle] = React.useState(false)
  const setHandle = () => {
    navbarHandle(!navbarState)
  }
  return <Routes navbarState={navbarState} handleNavbar={setHandle} />;
}

export default App;
