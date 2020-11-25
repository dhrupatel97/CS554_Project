import React from 'react';
import { doSignOut } from '../firebase/FirebaseFunctions';
import { Button } from '@material-ui/core';

const SignOutButton = () => {
  return (
    <Button type="button" onClick={doSignOut}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;