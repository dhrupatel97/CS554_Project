import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import SignOutButton from './SignOut';
import '../App.css';

const Navigation = () => {
  const { currentUser } = useContext(AuthContext);
  return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active" style={{ textDecoration: 'none', color:'white' }}>
            All Backgrounds
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/home" activeClassName="active" style={{ textDecoration: 'none', color:'white' }}>
            Home Backgrounds
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/office" activeClassName="active" style={{ textDecoration: 'none', color:'white' }}>
            office Backgrounds
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/outdoor" activeClassName="active" style={{ textDecoration: 'none', color:'white' }}>
            Outdoor Backgrounds
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/account" activeClassName="active" style={{ textDecoration: 'none', color:'white' }}>
            Account
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/uploadimage" activeClassName="active" style={{ textDecoration: 'none', color:'white' }}>
            upload Image
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/uploads" activeClassName="active" style={{ textDecoration: 'none', color:'white' }}>
            My Images
          </NavLink>
        </li>
        <li>
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
};

const NavigationNonAuth = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active" style={{ textDecoration: 'none', color:'white' }}>
            All Backgrounds
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/home" activeClassName="active" style={{ textDecoration: 'none', color:'white' }}>
            Home Backgrounds
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/office" activeClassName="active" style={{ textDecoration: 'none', color:'white' }}>
            office Backgrounds
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/outdoor" activeClassName="active" style={{ textDecoration: 'none', color:'white' }}>
            Outdoor Backgrounds
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/signup" activeClassName="active" style={{ textDecoration: 'none', color:'white' }}>
            Sign-up
          </NavLink>
        </li>

        <li>
          <NavLink exact to="/signin" activeClassName="active" style={{ textDecoration: 'none', color:'white' }}>
            Sign-In
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
