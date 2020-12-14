import React, { useContext, useState } from 'react';
import { AuthContext } from '../firebase/Auth';
import { doChangePassword } from '../firebase/FirebaseFunctions';
import '../App.css';

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
      <div className="uploadImageBox">
        {pwMatch && <h4 className="error">{pwMatch}</h4>}
        <h2 className="changePwd">Change Password</h2>
        <form onSubmit={submitForm}>          
            <label>
              Current Password:
              </label>
              <input
                className="p1" 
                name="currentPassword"
                id="currentPassword"
                type="password"
                placeholder="Current Password"
                required
              />
              <br></br>
            
         

          
            <label>
              New Password:
              </label>
              <input
                className="p2" 
                name="newPasswordOne"
                id="newPasswordOne"
                type="password"
                placeholder="Password"
                required
              />
              <br></br>
            
          
          
            <label>
              Confirm Password:
              </label>
              <input
                className="p3" 
                name="newPasswordTwo"
                id="newPasswordTwo"
                type="password"
                placeholder="Confirm Password"
                required
              />
              <br></br>
            
          

          <button type="submit" className="pwd">Change Password</button>
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