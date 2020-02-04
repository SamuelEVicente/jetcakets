import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Welcome: React.FC = () => {
  localStorage.authenticated = false;
  let history = useHistory();
  React.useEffect(() => {
    if (localStorage.authenticated === "true") {
      history.push("home");
    }
  }, [history]);

  return (
    <WelcomeContainer>
      <Title>Welcome to JetCake Coding Challenge!!</Title>
      <Row>
        <Link href="/login">Log In</Link>
        <Link href="/signup">Sign Up</Link>
      </Row>
    </WelcomeContainer>
  );
};

const Title = styled.h1`
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const Link = styled.a`
  color: black;
`;

const WelcomeContainer = styled.div`
  background-color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: space-evenly;
  justify-content: space-evenly;
  font-size: calc(10px + 2vmin);
  color: black;
`;

export default Welcome;
