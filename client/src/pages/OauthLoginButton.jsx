import React from "react";
import GoogleButton from 'react-google-button'

const OauthLoginButton = () => {
    
    const GoogleLogin = () => {
        const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
      
        const options = {
          redirect_uri: 'http://localhost:3000/loading',
          client_id: '1021401509525-0lggmm4a9ln7cqbmer2dqlctednoghcv.apps.googleusercontent.com',
          access_type: 'offline',
          response_type: 'code',
          prompt: 'consent',
          scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
          ].join(' '),
        };
        const qs = new URLSearchParams(options);
        const url = `${rootUrl}?${qs.toString()}`;
        console.log(url);
      
        const strWindowFeatures =
          'toolbar=no, menubar=no, width=600, height=700, top=100, left=800';
        window.open(url, '_self', strWindowFeatures);
      };


    return (
        <div>
          <GoogleButton onClick={GoogleLogin}/>
        </div>
    );
};

export default OauthLoginButton;

