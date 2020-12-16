import React from 'react';
import {Link} from 'react-router-dom'
import { doSignOut } from '../firebase/FirebaseFunctions';
import { Button } from '@material-ui/core';

const SignOutButton = () => {
  return (
    <Link class='nav-link' type="button" onClick={doSignOut}>
      Sign Out
    </Link>
  );
};

export default SignOutButton;