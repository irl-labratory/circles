import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';	

const LoginPage = () => {

	const navigate = useNavigate()

	useEffect(() => {
		console.log('i am in the useEffect')
		// take the information from the url and send it to the backend
		const windowUrl = window.location.search;
		const urlParams = new URLSearchParams(windowUrl);
		const code = urlParams.get('code');
		const state = urlParams.get('state')
	  
		console.log('authcode',code)

		// send the authorization code to the backend
		fetch('/api/oauth',{ // We need to create this route in the backend, middleware for this route already exists.
			method:'POST',
			headers:{'Content-Type': 'Application/JSON'},
			body: JSON.stringify({code:code, state:state}),
		})
		.then((data) => {
			if(data.status === 200) console.log(`OAuth : successfully sent authorization code back ${data.status}`);
			else console.log(`OAUTH: error sending authorization code back ${data.status}`);
			return data.json();
		})
		.then((res) => {
			// checking the response from the server
			console.log(res);
			// This is the info that needs to be saved in useContext
			setUser(res);

			return navigate(`/${res.user._id}`);
			//////////////////////////////////////////
		})
		.catch((err)=> {
			console.log({
			log:`error Post request to the server ${err}`,
			status:err,
			message: `error occured logging in`})
		})

	},[]);


	////////////////////////////////////////////


	return (
		<div className='signup-div'>
			<ClipLoader
				color={"#FF7F50"}
				loading={true}
				size={150}
			/>
		</div>
	);

};

export default LoginPage;