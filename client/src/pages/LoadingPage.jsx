import React, { useState, useContext } from 'react';
import { useNavigate, Form } from 'react-router-dom';
import { userContext } from '../context';
// import '../scss/SignUpPage.scss'

const LoginPage = () => {

	const { user, setUser } = useContext(userContext);
	const navigate = useNavigate()

	////////////////////////////////////////////

	async function handleSubmit(e) {
	
	// make the fetch to the backend to authenticate the credentials
	try {
        e.preventDefault();

		const response = await fetch('/api/user/signup', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});
        // **checking to see if user is already in database
		const res = await response.json();
		console.log('this is a new user?', res.verified)
			if (res.verified) {
				setUser(res.user);
				console.log('Signup successful!');
				return navigate(`${res.user._id}`);
			} else if (!res.verified) alert('Username already taken, please choose another username');
	}
		 catch (error) {
		console.error(error);
		}
	}
	/////////////////////////////////////////////////

	return (
		<main className='signup-page'>
			<div className='signup-div'>
				<h1>Loading</h1>
			</div>
		</main>
	);
  
  
  // return (
  //   <h1>Signup Page</h1>
  // )
};

export default LoginPage;