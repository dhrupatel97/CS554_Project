import React, { useContext } from 'react';
import SocialSignIn from './SocialSignIn';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import {
  doSignInWithEmailAndPassword,
  doPasswordReset
} from '../firebase/FirebaseFunctions';

function SignIn() {
  const { currentUser } = useContext(AuthContext);
  const handleLogin = async (event) => {
    event.preventDefault();
    let { email, password } = event.target.elements;

    try {
      await doSignInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  };

  const passwordReset = (event) => {
    event.preventDefault();
    let email = document.getElementById('email').value;
    if (email) {
      doPasswordReset(email);
      alert('Password reset email was sent');
    } else {
      alert(
        'Please enter an email address below before you click the forgot password link'
      );
    }
  };
  if (currentUser) {
    return <Redirect to="/home" />;
  }
  return (
    <div className="loginBox">
      <h1 >Log in</h1>
      <form onSubmit={handleLogin}>
        
          <label>
            Email:
            </label>  
            <input
              className="l1"
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              required
            />
            <br></br>
          
        
        
          <label>
            Password:
            </label>
            <input
              className="l2"
              name="password"
              type="password"
              placeholder="Password"
              required
            />
            <br></br>
            
          
       
        <button type="submit" className="login">Log in</button>

        <button className="forgotPassword" onClick={passwordReset} className="forgot">
          Forgot Password
        </button>
      </form>

      <br />
      <SocialSignIn />
    </div>
  );
}

export default SignIn;