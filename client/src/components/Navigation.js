import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import SignOutButton from './SignOut';
import {DropdownButton, Dropdown} from 'react-bootstrap'
import '../App.css';
import logo from '../imgs/logo.png'
import Search from './Search';

const Navigation = () => {
  const { currentUser } = useContext(AuthContext);
  return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">ARTSY</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <DropdownButton
                  alignRight
                  title = "Category"
                  variant="secondary"
                  id="dropdown-menu-align-right"
                  
                >
                  <Dropdown.Item ><Link exact to="/home">
                Home
              </Link></Dropdown.Item>
                  <Dropdown.Item ><Link exact to="/outdoor">
                Outdoor
              </Link></Dropdown.Item>
                  <Dropdown.Item ><Link exact to="/office">
                Office
              </Link></Dropdown.Item>
              
                </DropdownButton>
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
        </div>
      </div>
    </nav>
  );
};

const NavigationNonAuth = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">ARTSY</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <DropdownButton
                  alignRight
                  title = "Category"
                  variant="secondary"
                  id="dropdown-menu-align-right"
                  
                >
                  <Dropdown.Item ><Link exact to="/home">
                Home
              </Link></Dropdown.Item>
                  <Dropdown.Item ><Link exact to="/outdoor">
                Outdoor
              </Link></Dropdown.Item>
                  <Dropdown.Item ><Link exact to="/office">
                Office
              </Link></Dropdown.Item>
              
                </DropdownButton>
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
          {/* <form class="d-flex">
            <Search/>
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form> */}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
