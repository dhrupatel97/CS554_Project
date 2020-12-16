import React from 'react';
import { doSocialSignIn } from '../firebase/FirebaseFunctions';
import googleSiginImg from '../imgs/btn_google_signin.png';
import facebookSigninImg from '../imgs/btn_facebook_signin.png'

const SocialSignIn = () => {
  const socialSignOn = async (provider) => {
    try {
      await doSocialSignIn(provider);
    } catch (error) {
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
      <div class="fb-login-button" data-size="small" data-button-type="login_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="true" data-width=""></div>
    </div>
  );
};

export default SocialSignIn;