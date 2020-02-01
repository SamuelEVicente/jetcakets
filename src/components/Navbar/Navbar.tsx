import React from "react";
import styled from "styled-components";
import Burgermenu from "../BurgerMenu/BurgerMenu";
import { useSpring, animated, config } from "react-spring";
import { INavProps } from "../../pages/types";

interface IProps extends INavProps {
  brand: { name: string; to: string };
  links: Array<{ name: string; to: string }>;
}
export const Navbar: React.FC<IProps> = ({
  brand,
  links,
  navbarState,
  handleNavbar
}) => {
  const barAnimation = useSpring({
    from: { transform: "translate3d(0, -10rem, 0)" },
    transform: "translate3d(0, 0, 0)"
  });

  const linkAnimation = useSpring({
    from: { transform: "translate3d(0, 30px, 0)", opacity: 0 },
    to: { transform: "translate3d(0, 0, 0)", opacity: 1 },
    delay: 800,
    config: config.wobbly
  });
  const { open } = useSpring({ open: navbarState ? 0 : 1 });
  const NavLinks: any = () =>
    links.map((link: { name: string; to: string }) => (
      <Link key={link.name} href={link.to}>
        {link.name}
      </Link>
    ));
  return (
    <>
      <Nav style={barAnimation}>
        <FlexContainer>
          <Brand style={linkAnimation} href={brand.to}>{brand.name}</Brand>
          <Ul style={linkAnimation}>
            <NavLinks />
          </Ul>
          <BurgerWrapper>
            <Burgermenu navbarState={navbarState} handleNavbar={handleNavbar} />
          </BurgerWrapper>
        </FlexContainer>
      </Nav>
      <CollapseWrapper
        style={{
          transform: open
            .interpolate({
              range: [0, 0.2, 0.3, 1],
              output: [0, -20, 0, -200]
            })
            .interpolate(openValue => `translate3d(0, ${openValue}px, 0`)
        }}
      >
        <CollaspeLinks>
          {links.map((link: { name: string; to: string }) => (
            <li key={link.name}>
              <a
                href={link.to}
                onClick={() => {
                  handleNavbar();
                }}
              >
                {link.name}
              </a>
            </li>
          ))}
        </CollaspeLinks>
      </CollapseWrapper>
    </>
  );
};

const Nav = styled(animated.nav)`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: black;
  z-index: 1;
  font-size: 1.4rem;
`;

const Link = styled.a`
  font-size: 1rem;
`;

const CollapseWrapper = styled(animated.div)`
  background: black;
  position: fixed;
  top: 4.5rem;
  left: 0;
  right: 0;
`;
const FlexContainer = styled.div`
  max-width: 120rem;
  display: flex;
  margin: auto;
  padding: 0 2rem;
  justify-content: space-between;
  height: 5rem;
`;

const BurgerWrapper = styled.div`
  margin: auto 0;

  @media (min-width: 769px) {
    display: none;
  }
`;

const Brand = styled(animated.a)`
  font-weight: bold;
  font-style: italic;
  margin-left: 1rem;
  padding-right: 1rem;
  margin: 1.5rem;
  margin-bottom: 1rem;
  color: white;
`;

const Ul = styled(animated.ul)`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;
  width: auto;
  flex-direction: row;

  & a {
    color: #dfe6e9;
    text-transform: uppercase;
    font-weight: 600;
    border-bottom: 1px solid transparent;
    margin: 0 1.5rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #fdcb6e;
      border-bottom: 1px solid #fdcb6e;
    }

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const CollaspeLinks = styled.ul`
  list-style-type: none;
  padding: 2rem 1rem 2rem 2rem;

  & li {
    transition: all 300ms linear 0s;
  }

  & a {
    font-size: 1.4rem;
    line-height: 2;
    color: #dfe6e9;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #fdcb6e;
      border-bottom: 1px solid #fdcb6e;
    }
  }
`;
export default Navbar;
