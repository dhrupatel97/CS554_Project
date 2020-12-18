import React, { useContext, useState } from 'react';
import { AuthContext } from '../firebase/Auth';
import { doChangePassword } from '../firebase/FirebaseFunctions';
import '../App.css';
import FooterPage from './FooterPage';

function ChangePassword() {
  const { currentUser } = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState('');
  console.log(currentUser);

  const submitForm = async (event) => {
    event.preventDefault();
    const {
      currentPassword,
      newPasswordOne,
      newPasswordTwo
    } = event.target.elements;

    if (newPasswordOne.value !== newPasswordTwo.value) {
      setPwMatch('New Passwords do not match, please try again');
      return false;
    }

    try {
      await doChangePassword(
        currentUser.email,
        currentPassword.value,
        newPasswordOne.value
      );
      alert('Password has been changed, you will now be logged out');
    } catch (error) {
      alert(error);
    }
  };
  if (currentUser.providerData[0].providerId === 'password') {
    return (
      <div class="container-box">
        {pwMatch && <h4 className="error">{pwMatch}</h4>}
        <h2 class="text-center">Change Password</h2>
        <form onSubmit={submitForm} class="registration-form">          
            <label>
            <span class="label-text">Current Password</span>
            
              <input
                className="inputFields"
                name="currentPassword"
                id="currentPassword"
                type="password"
                placeholder="Current Password"
                required
              />
                </label>
              <br></br>
            
         

          
            <label>
            <span class="label-text">New Password</span>
             
              <input
                className="inputFields"
                name="newPasswordOne"
                id="newPasswordOne"
                type="password"
                placeholder="Password"
                required
              />
               </label>
              <br></br>
            
          
          
            <label>
            <span class="label-text">Confirm Password</span>
            
              <input
                className="inputFields"
                name="newPasswordTwo"
                id="newPasswordTwo"
                type="password"
                placeholder="Confirm Password"
                required
              />
                </label>
              <br></br>
            
          
          <div class='text-center'>
            <button type="submit" class="submit">Change Password</button>
          </div>
        </form>
        <br />
     
      </div>
    );
  } else {
    return (
      <div>
        <h2>
          You are signed in using a Social Media Provider, You cannot change
          your password
        </h2>
       
      </div>
    );
  }
}

export default ChangePassword;