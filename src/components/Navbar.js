import React from 'react';
import { Link } from 'react-router-dom';
import {
  StyledNavbar,
  StyledNavBrand,
  StyledNavItems,
  StyledLink,
} from '../styled/Navbar';
import { Accent } from '../styled/Random';

export default function Navbar() {
  return (
    <StyledNavbar>
      <StyledNavBrand>
        <Link to='/'>
          Chau_<Accent>Codes</Accent>
        </Link>
      </StyledNavBrand>
      <StyledNavItems>
        <li>
          <StyledLink to='/'>Home</StyledLink>
        </li>
        <li>
          <StyledLink to='/highScores'>High Scores</StyledLink>
        </li>
      </StyledNavItems>
    </StyledNavbar>
  );
}
