import React, { useContext } from 'react';
import SocialSignIn from './SocialSignIn';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import {
  doSignInWithEmailAndPassword,
  doPasswordReset
} from '../firebase/FirebaseFunctions';
import firebaseApp from '../firebase/Firebase'
import logo from '../imgs/logo.png'
import FooterPage from './FooterPage';

function SignIn() {
  const { currentUser } = useContext(AuthContext);
  const handleLogin = async (event) => {
    event.preventDefault();
    let { email, password } = event.target.elements;

    try {
      await doSignInWithEmailAndPassword(email.value, password.value);
      const user = firebaseApp.auth().currentUser;
      const token = user && (await user.getIdToken());
      console.log(token);
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
    return <Redirect to="/" />;
  }
  return (
    <div class="container-box">
      <header>
        <h1>
          <a href="#">
            <img src={logo} alt="Authentic Collection"/>
          </a>
        </h1>
      </header>
      <h1 class="text-center">Log In</h1>
      <form onSubmit={handleLogin} class="registration-form">
        <label>
          <span class="label-text">Email</span>
            <input
              className="inputFields"
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              required
            />
        </label>
        <br/>
        <label class="password">
          <span class="label-text">Password</span>
          <button class="toggle-visibility" title="toggle password visibility" tabindex="-1">
            <span class="glyphicon glyphicon-eye-close"></span>
          </button>
            <input
              className="inputFields"
              name="password"
              type="password"
              placeholder="Password"
              required
            />
        </label>
        <br/>
        <br/>
        <div class="text-center">
          <button class="submit" name="submitButton">Log In</button>
          <button onClick={passwordReset} className="submit">Forgot Password</button>
          <SocialSignIn/>
        </div>
      </form>
      
    </div>
  );
}

export default SignIn;