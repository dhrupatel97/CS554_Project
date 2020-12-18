import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../firebase/FirebaseFunctions';
import { AuthContext } from '../firebase/Auth';
import SocialSignIn from './SocialSignIn';
import logo from '../imgs/logo.png'
import FooterPage from './FooterPage';

function SignUp() {
  const { currentUser } = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState('');
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { displayName, email, passwordOne, passwordTwo } = e.target.elements;
    if (passwordOne.value !== passwordTwo.value) {
      setPwMatch('Passwords do not match');
      return false;
    }

    try {
      await doCreateUserWithEmailAndPassword(
        email.value,
        passwordOne.value,
        displayName
      );
      const bodyValues =  {
        "firstName" : displayName.value,
        "email" : email.value
      }
      
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyValues),
        accept: 'application/json'
      };
      fetch('/api/users',requestOptions).then(res => {
        console.log(res);
        return res.json()
      }).catch((err) => console.log(err));
    } catch (error) {
      alert(error);
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
      <h1 class="text-center">Register</h1>
      <br/><br/>
      <form onSubmit={handleSignUp} class="registration-form">
        {pwMatch && <h4 className="error">{pwMatch}</h4>}
        <label class="col-one-half">
          <span class="label-text">Name</span>
          <input
              required
              name="displayName"
              type="text" class="inputFields"
              placeholder="Name"/>
        </label>
        <label class="col-one-half">
          <span class="label-text">Email</span>
          <input
              required
              name="email" class="inputFields"
              type="email"
              placeholder="Email"
            />
        </label>
        <br/>
        <label class="password">
          <span class="label-text">Password</span>
          <button class="toggle-visibility" title="toggle password visibility" tabindex="-1">
            <span class="glyphicon glyphicon-eye-close"></span>
          </button>
          <input
              required
              id='passwordOne'
              name="passwordOne" class="inputFields"
              type="password"
              placeholder="Password"
            />
        </label>
        <br/>
        <label class="password">
          <span class="label-text">Confirm Password</span>
          <button class="toggle-visibility" title="toggle password visibility" tabindex="-1">
            <span class="glyphicon glyphicon-eye-close"></span>
          </button>
          <input
              required
              id='passwordTwo'
              name="passwordTwo" class="inputFields"
              type="password"
              placeholder="Confirm Password"
            />
        </label>
        <br/>
        <div class="text-center">
          <button class="submit" name="submitButton">Sign Me Up</button>
          <SocialSignIn/>
        </div>
      </form>
    
    </div>
  );
}

export default SignUp;