import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import SignOutButton from './SignOut';
import '../App.css';
import logo from '../imgs/logo.png'

const Navigation = () => {
  const { currentUser } = useContext(AuthContext);
  return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">ARTSY</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link exact to="/home" class='nav-link'>
                Home Backgrounds
              </Link>
            </li>
            <li class="nav-item">
              <Link exact to="/office" class='nav-link'>
                Office Backgrounds
              </Link>
            </li>
            <li class="nav-item">
              <Link exact to="/outdoor" class='nav-link'>
                Outdoor Backgrounds
              </Link>
            </li>
            <li class="nav-item">
              <Link exact to="/uploads" class='nav-link' >
                My Photos
              </Link>
            </li>
            <li class="nav-item">
              <Link exact to="/account" class='nav-link' >
                Account
              </Link>
            </li>
            <li class="nav-item">
              <Link exact to="/uploadimage" class='nav-link'  >
                Upload Image
              </Link>
            </li>
            <li class='nav-item'>
              <SignOutButton/>
            </li>
          </ul>
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

const NavigationNonAuth = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">ARTSY</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link exact to="/home" class='nav-link'>
                Home Backgrounds
              </Link>
            </li>
            <li class="nav-item">
              <Link exact to="/office" class='nav-link'>
                Office Backgrounds
              </Link>
            </li>
            <li class="nav-item">
              <Link exact to="/outdoor" class='nav-link'>
                Outdoor Backgrounds
              </Link>
            </li>
            <li class="nav-item">
              <Link exact to="/signup" class='nav-link' >
                Sign Up
              </Link>
            </li>
            <li class="nav-item">
              <Link exact to="/signin" class='nav-link'  >
                Sign In
              </Link>
            </li>
          </ul>
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
