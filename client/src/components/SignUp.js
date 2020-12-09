import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../firebase/FirebaseFunctions';
import { AuthContext } from '../firebase/Auth';
import SocialSignIn from './SocialSignIn';
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
    } catch (error) {
      alert(error);
    }
  };

  if (currentUser) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="loginBox">
      <h1>Sign up</h1>
      {pwMatch && <h4 className="error">{pwMatch}</h4>}
      <form onSubmit={handleSignUp}>
   
          <label>
            Name:
            </label>
            <input
              className="s1"
              required
              name="displayName"
              type="text"
              placeholder="Name"
            />
            <br></br>
          
        
          <label>
            Email:
            </label>        

            <input
              className="s2"
              required
              name="email"
              type="email"
              placeholder="Email"
            />
            <br></br>
         
       
          <label>
            Password:
            </label>
            <input
              className="s3"
              id="passwordOne"
              name="passwordOne"
              type="password"
              placeholder="Password"
              required
            />
            <br></br>
          
      
        
          <label>
            Confirm Password:
            </label>
            <input
              className="s4"
              name="passwordTwo"
              type="password"
              placeholder="Confirm Password"
              required
            />
            <br></br>
          
        
        <button id="submitButton" name="submitButton" type="submit" className="signup">
          Sign Up
        </button>
      </form>
      <br />
      <SocialSignIn />
    </div>
  );
}

export default SignUp;