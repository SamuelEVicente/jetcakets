import React from "react";
import styled from "styled-components";

export const Footer = () => (
  <FooterStyled>
    <p>Jetcake</p>
  </FooterStyled>
);

const FooterStyled = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background: black;
  border-radius: 8px;
  border: 4px solid white;
  font-weight: bold;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  color: white;
`;
