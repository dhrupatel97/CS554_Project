import React from 'react';
import { doSocialSignIn } from '../firebase/FirebaseFunctions';
import googleSiginImg from '../imgs/btn_google_signin.png';
import firebaseApp from '../firebase/Firebase'

const SocialSignIn = () => {
  const socialSignOn = async (provider) => {
    try {
      await doSocialSignIn(provider);
      const user = firebaseApp.auth().currentUser;
      const token = user && (await user.getIdToken());
      const bodyValues =  {
        "firstName" : user.displayName,
        "email" : user.email
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
    } 
     catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <div id="fb-root"></div>
      <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v9.0&appId=307882003663398" nonce="nq3cie9u"></script>
      <img
        onClick={() => socialSignOn('google')}
        alt="google signin"
        src= {googleSiginImg}
      />
    </div>
  );
};

export default SocialSignIn;