import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  background: #111111;
  width: 100%;
  height: 64px;
  display: flex;
  padding: 0 5rem;
  z-index: 10;
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 100%;
  cursor: pointer;
  &.active {
    color: white;
  }
`;

function NavBar() {
    return (
        <Nav>
            <NavLink to='/'>
                <h1>Unicum.gg</h1>
            </NavLink>
        </Nav>
    );
};

export default NavBar;