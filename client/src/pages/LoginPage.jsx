import { useNavigate, Form } from 'react-router-dom';
import { useState } from 'react';
import OauthLoginButton from './OauthLoginButton.jsx'


const LoginPage = () => {

	// const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const { user, setUser } = useContext(userContext)
 	// const navigate = useNavigate();

	////////////////////////////////////////////
	// async function handleSubmit(e) {
	// // make the fetch to the backend to authenticate the credentials
	// try {
  //     e.preventDefault();
  //     // will this be a post request?
	// 	  const response = await fetch('/api/user/login', {
	// 		method: 'POST',
	// 		headers: {
	// 		'Content-Type': 'application/json'
	// 		},
	// 		body: JSON.stringify({ username, password })
  //   });

  //   console.log(response.status)
  //   if(response.status === 200){

  //   const res = await response.json();
  //   console.log(res.verified)
    
  //     if (res.verified) {
  //       console.log('Authentication successful!');
            
  //       // Send the username and password to the server for authentication 
  //       // setUsername(''); // does this  match with the userSchema (the word User)
  //       // setPassword('');
  //       // setUser([...res.user]);
  
  //       // console.log(user)
  //       console.log('res.user: ', res.user)
    
  //       return navigate(`/${res.user._id}`); //TODO
  //     } else {
  //       console.log(res.verified)
  //       alert('Invalid Credentials');
  //       return navigate('/')
  //     }
  //   } else {
  //     alert('Server fail')
  //   }
    
	// 	} catch (error) {
	// 	console.error(error);
	// 	}
	// }
	/////////////////////////////////////////////////

    //do we need fetch for this as well?
  //   const redirectToSignupPage = () => {
	//     return navigate(`/signup`);
	// }


	return (
		<main className='login-page'>
			<div className='login-div'>

        <p id='name-label' className='username-subhead'>
          <p>Welcome</p>
          <p>To </p>
          <p>Circles</p>
        </p>
        <div className='form-div'>
          <OauthLoginButton />
          {/* <Form onSubmit ={handleSubmit}>
            <div className='username-section'>
              <input 
                type='text'
                placeholder='username'
                // placeholder="What's a good nickname?..." 
                value = {username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='password-section'>
              <input 
                type='text'
                placeholder="password" 
                value = {password}     
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') return handleSubmit();
                }}
              />
            </div>
            <div className='outer-btn-div'>
              <div className='button-div'>
                <button id='login-btn' type='submit'>Login</button>
              </div>
              <div className='button-div'>
                <button id='signup-btn' onClick={redirectToSignupPage}>Sign Up</button>
              </div>
            </div>
          </Form> */}
        </div>
      </div>
		</main>
	);
};

export default LoginPage;